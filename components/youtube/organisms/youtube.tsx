import React from 'react';
import cssxy from 'cssxy';
import {createPlayer} from '../atoms';
// import {Player} from '../atoms';

export interface YoutubeProps {
  videoId: string;
  theme?: {
    width?: string;
    height?: string;
  };
}

const delay = async () => new Promise(r => setTimeout(r, 1000));

export class Youtube extends React.Component<YoutubeProps> {
  static defaultProps = {
    theme: {
      width: '50vw',
      height: '50vh',
    },
  };

  YT!: any;
  player!: any;

  state = {
    Player: createPlayer(
      cssxy({
        ...{width: '50vw', height: '50vh'},
        ...(this.props.theme as any),
      }),
    ),
  };

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
    return <this.state.Player id="ytplayer" />;
  }
}
