import React, { useState, useEffect } from 'react';
import { Clock, Zap, TrendingDown, TrendingUp, Play, Pause, BarChart3, AlertCircle } from 'lucide-react';

export default function ContextSwitchTracker() {
  const [currentTask, setCurrentTask] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [switches, setSwitches] = useState(0);
  const [sessionStart, setSessionStart] = useState(null);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTracking && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking, startTime]);

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  };

  const startTask = () => {
    if (!currentTask.trim()) return;
    
    const now = Date.now();
    if (!sessionStart) {
      setSessionStart(now);
    }
    
    setStartTime(now);
    setIsTracking(true);
    setElapsedTime(0);
  };

  const switchTask = () => {
    if (!isTracking || !currentTask.trim()) return;

    const now = Date.now();
    const duration = now - startTime;
    
    // Save the current task
    setTasks(prev => [...prev, {
      name: currentTask,
      duration: duration,
      timestamp: startTime,
      id: Date.now()
    }]);

    setSwitches(prev => prev + 1);
    setCurrentTask('');
    setStartTime(null);
    setElapsedTime(0);
    setIsTracking(false);
  };

  const endSession = () => {
    if (isTracking) {
      switchTask();
    }
    // Keep the data but mark session as ended
  };

  const resetSession = () => {
    setTasks([]);
    setSwitches(0);
    setCurrentTask('');
    setIsTracking(false);
    setStartTime(null);
    setElapsedTime(0);
    setSessionStart(null);
  };

  // Calculate metrics
  const totalTime = tasks.reduce((sum, task) => sum + task.duration, 0) + (isTracking ? elapsedTime : 0);
  const avgTaskDuration = tasks.length > 0 ? tasks.reduce((sum, task) => sum + task.duration, 0) / tasks.length : 0;
  const longestTask = tasks.length > 0 ? Math.max(...tasks.map(t => t.duration)) : 0;
  
  // Deep work is considered tasks longer than 25 minutes
  const deepWorkThreshold = 25 * 60 * 1000;
  const deepWorkTime = tasks.filter(t => t.duration >= deepWorkThreshold).reduce((sum, t) => sum + t.duration, 0);
  const deepWorkPercentage = totalTime > 0 ? (deepWorkTime / totalTime) * 100 : 0;

  // Context switch cost (assuming 23 minutes to refocus per switch)
  const switchCostMinutes = switches * 23;
  const productivityLoss = totalTime > 0 ? (switchCostMinutes * 60 * 1000 / totalTime) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Zap className="text-yellow-400" size={40} />
            Context Switch Tracker
          </h1>
          <p className="text-slate-300">Monitor your focus and protect your deep work time</p>
        </div>

        {/* Current Task Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6 border border-white/20">
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">Current Task</label>
            <input
              type="text"
              value={currentTask}
              onChange={(e) => setCurrentTask(e.target.value)}
              placeholder="What are you working on?"
              disabled={isTracking}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
            />
          </div>

          <div className="flex gap-4">
            {!isTracking ? (
              <button
                onClick={startTask}
                disabled={!currentTask.trim()}
                className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Play size={20} />
                Start Task
              </button>
            ) : (
              <>
                <div className="flex-1 bg-purple-500/20 border-2 border-purple-400 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2">
                  <Clock className="animate-pulse" size={20} />
                  {formatTime(elapsedTime)}
                </div>
                <button
                  onClick={switchTask}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Pause size={20} />
                  Switch Task
                </button>
              </>
            )}
          </div>
        </div>

        {/* Metrics Dashboard */}
        {(tasks.length > 0 || isTracking) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300 text-sm">Context Switches</span>
                <TrendingDown className="text-red-400" size={20} />
              </div>
              <div className="text-3xl font-bold text-white">{switches}</div>
              <div className="text-xs text-slate-400 mt-1">~{switchCostMinutes} min lost</div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300 text-sm">Avg Task Duration</span>
                <BarChart3 className="text-blue-400" size={20} />
              </div>
              <div className="text-3xl font-bold text-white">
                {Math.floor(avgTaskDuration / 60000)}m
              </div>
              <div className="text-xs text-slate-400 mt-1">{tasks.length} tasks completed</div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300 text-sm">Deep Work %</span>
                <TrendingUp className="text-green-400" size={20} />
              </div>
              <div className="text-3xl font-bold text-white">
                {deepWorkPercentage.toFixed(0)}%
              </div>
              <div className="text-xs text-slate-400 mt-1">Tasks &gt; 25 min</div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300 text-sm">Total Session</span>
                <Clock className="text-purple-400" size={20} />
              </div>
              <div className="text-3xl font-bold text-white">
                {Math.floor(totalTime / 3600000)}h {Math.floor((totalTime % 3600000) / 60000)}m
              </div>
              <div className="text-xs text-slate-400 mt-1">Active time</div>
            </div>
          </div>
        )}

        {/* Productivity Alert */}
        {switches > 5 && productivityLoss > 30 && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="text-red-400 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="text-white font-semibold mb-1">High Context Switching Detected</h3>
              <p className="text-red-200 text-sm">
                You've switched tasks {switches} times today, potentially losing {productivityLoss.toFixed(0)}% of your productivity. 
                Consider blocking off longer periods for deep work.
              </p>
            </div>
          </div>
        )}

        {/* Task History */}
        {tasks.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3 size={24} />
              Task History
            </h2>
            <div className="space-y-3">
              {tasks.slice().reverse().map((task, idx) => (
                <div key={task.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-medium flex-1">{task.name}</h3>
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      task.duration >= deepWorkThreshold 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-orange-500/20 text-orange-300'
                    }`}>
                      {formatTime(task.duration)}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">
                    {new Date(task.timestamp).toLocaleTimeString()}
                  </div>
                  {task.duration >= deepWorkThreshold && (
                    <div className="mt-2 text-xs text-green-400 flex items-center gap-1">
                      <TrendingUp size={12} />
                      Deep work session
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {(tasks.length > 0 || isTracking) && (
          <div className="flex gap-4">
            <button
              onClick={endSession}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              End Session
            </button>
            <button
              onClick={resetSession}
              className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Reset All
            </button>
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-8 bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <h3 className="text-white font-semibold mb-3">💡 Deep Work Tips</h3>
          <ul className="text-slate-300 text-sm space-y-2">
            <li>• Aim for task blocks of at least 25 minutes to enter flow state</li>
            <li>• Each context switch costs ~23 minutes of refocusing time</li>
            <li>• Schedule "context switch time" for emails, messages, and quick tasks</li>
            <li>• Protect your morning hours for deep, creative work</li>
            <li>• Use "Do Not Disturb" mode during tracked tasks</li>
          </ul>
        </div>
      </div>
    </div>
  );
}