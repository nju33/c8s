import React from 'react';
import {Player} from '../atoms';

export interface YoutubeProps {
  videoId: string;
}

const delay = async () => new Promise(r => setTimeout(r, 1000));

export class Youtube extends React.Component<YoutubeProps> {
  YT!: any;
  player!: any;

  static readonly API_URL = 'https://www.youtube.com/iframe_api';

  static readonly embedAPIScript = async (): Promise<{Player: any}> => {
    return new Promise<{Player: any}>(async resolve => {
      if (document.querySelector(`script[src='${Youtube.API_URL}']`) !== null) {
        await delay();
        resolve((window as any).YT as any);
        return;
      }

      const script = document.createElement('script');
      script.addEventListener('load', async () => {
        await delay();
        resolve((window as any).YT as any);
      });
      script.src = Youtube.API_URL;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    });
  };

  private async loadVideo() {
    this.player.loadVideoById(this.props.videoId);
  }

  private async loadInitialVideo() {
    return new Promise(resolve => {
      this.player = new this.YT.Player('ytplayer', {
        height: 9999,
        width: 9999,
        videoId: this.props.videoId,
        events: {
          onReady: resolve,
        },
      });
    });
  }

  async componentDidMount() {
    this.YT = await Youtube.embedAPIScript();
    await this.loadInitialVideo();
  }

  render() {
    return <Player id="ytplayer" />;
  }
}
