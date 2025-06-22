# caption_extractor.py
from youtube_transcript_api import YouTubeTranscriptApi
import json
import sys

def get_captions(video_id):
    try:
        # Get the transcripts/captions
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id, languages=['en'])
        
        # Format the transcript
        formatted_transcript = {
            'success': True,
            'captions': transcript_list,
            'fullText': ' '.join(item['text'] for item in transcript_list)
        }
        
        # Return as JSON string
        return json.dumps(formatted_transcript)
        
    except Exception as e:
        error_response = {
            'success': False,
            'error': str(e)
        }
        return json.dumps(error_response)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        video_id = sys.argv[1]
        print(get_captions(video_id))
    else:
        print(json.dumps({'success': False, 'error': 'No video ID provided'}))