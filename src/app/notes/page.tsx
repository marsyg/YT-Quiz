'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { NotesService } from '@/lib/notes';

export default function NotesPage() {
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const videoId = searchParams.get('videoId');
  const [captions, setCaptions] = useState('');

  const generateNotes = async () =>{
    setIsLoading(true);
    const captions = await fetchCaptions(videoId);
    const notes = await NotesService.generateSummaryNotes(videoId, captions);
    setNotes(notes);
    setIsLoading(false);
     
  }

  const fetchCaptions = async (videoId: string) => {
    const response = await fetch(`/api/getCaptions?videoId=${videoId}`);

    const data = await response.json();
    if (response.ok) {
      console.log(data.captions);
    } else {
      console.error(data.error);
    }
  };

  useEffect(() => {
    if (videoId) {
      const captions =  fetchCaptions(videoId) ;
      setCaptions(captions);
      console.log(captions);
    }
  }, []);
  useEffect(() => {
    if(!captions){
      console.log("no captions");
    }
   console.log(captions);
  }, [captions]);

 
  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Write your notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[200px]"
            />
            <Button
              onClick={() => {
                fetchCaptions(videoId);
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Save Notes'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}