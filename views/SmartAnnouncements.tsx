
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Sparkles, MessageSquare, Trash2, Calendar, Target } from 'lucide-react';

const SmartAnnouncements = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [announcements, setAnnouncements] = useState<any[]>([
    {
      id: 1,
      title: 'Water Interruption - Cluster 4',
      content: 'Please be advised that there will be a scheduled water interruption for maintenance on Cluster 4 this coming Saturday from 1PM to 5PM.',
      date: 'Oct 24, 2023',
      targets: 'Cluster 4'
    }
  ]);
  const [generatedText, setGeneratedText] = useState('');

  const generateWithAI = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      // Fix: Follow strict SDK rules for initialization using process.env.API_KEY directly
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a formal and clear HOA announcement based on these details: ${prompt}. Format the output with a Title and then the content.`,
        config: {
          systemInstruction: 'You are a professional HOA administrator for BSML complex. Your tone is respectful, informative, and concise.'
        }
      });
      setGeneratedText(response.text || '');
    } catch (error) {
      console.error(error);
      setGeneratedText('Failed to generate. Please ensure your API key is valid.');
    } finally {
      setLoading(false);
    }
  };

  const postAnnouncement = () => {
    if (!generatedText) return;
    const lines = generatedText.split('\n').filter(l => l.trim());
    const title = lines[0]?.replace('Title: ', '') || 'New Announcement';
    const content = lines.slice(1).join('\n');
    
    setAnnouncements([{
      id: Date.now(),
      title,
      content,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      targets: 'All Clusters'
    }, ...announcements]);
    setGeneratedText('');
    setPrompt('');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Broadcast Center</h2>
          <p className="text-slate-500 mt-1">Create announcements for specific clusters using AI assistance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Smart Announcement Creator
            </h3>
            <textarea 
              className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm focus:ring-2 focus:ring-indigo-100 transition-all"
              placeholder="e.g., General Assembly meeting on Nov 5th at the clubhouse, 10 AM. Snacks provided."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button 
              onClick={generateWithAI}
              disabled={loading || !prompt}
              className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
            >
              {loading ? 'AI is thinking...' : <><Sparkles className="w-4 h-4" /> Refine with Gemini</>}
            </button>

            {generatedText && (
              <div className="mt-8 p-6 bg-indigo-50 rounded-xl border border-indigo-100 animate-in zoom-in-95">
                <h4 className="font-bold text-indigo-900 mb-2">Draft Preview</h4>
                <div className="text-sm text-indigo-800 whitespace-pre-wrap leading-relaxed mb-6">
                  {generatedText}
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={postAnnouncement}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700"
                  >
                    Post to Dashboard
                  </button>
                  <button 
                    onClick={() => setGeneratedText('')}
                    className="px-4 py-2 border border-indigo-200 text-indigo-600 rounded-lg font-bold hover:bg-indigo-100"
                  >
                    Discard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-600" />
            Recent Announcements
          </h3>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {announcements.map(a => (
              <div key={a.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-slate-800 text-lg leading-snug">{a.title}</h4>
                  <button onClick={() => setAnnouncements(announcements.filter(item => item.id !== a.id))}>
                    <Trash2 className="w-4 h-4 text-slate-300 hover:text-red-500 transition-colors" />
                  </button>
                </div>
                <p className="text-sm text-slate-600 mb-4 line-clamp-3">{a.content}</p>
                <div className="flex items-center gap-4 border-t border-slate-50 pt-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase">
                    <Calendar className="w-3 h-3" />
                    {a.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-500 uppercase">
                    <Target className="w-3 h-3" />
                    {a.targets}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartAnnouncements;