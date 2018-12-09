import {Machine as machine} from 'xstate';
import {interpret} from 'xstate/lib/interpreter';

export enum Cycle {
  Still = 'still',
  Prepare = 'prepare',
  Process = 'process',
  Done = 'done',
}

export const createCycle = () => {
  let service = interpret(
    machine({
      initial: Cycle.Process,
      states: {
        still: {
          on: {
            next: Cycle.Prepare,
          },
        },
        prepare: {
          on: {
            next: Cycle.Process,
          },
        },
        process: {
          on: {
            next: Cycle.Still,
          },
        },
        // done: {
        //   on: {
        //     next: Cycle.Still,
        //   },
        // },
      },
    }),
  ).start();

  let value: Cycle = Cycle.Process;

  return {
    reset() {
      service = service.init();
    },
    next(): Cycle {
      value = service.send('next').value as Cycle;
      return value;
    },
    get value() {
      return value;
    },
  };
};
