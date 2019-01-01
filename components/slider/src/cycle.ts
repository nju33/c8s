import {Machine as machine} from 'xstate';
import {interpret} from 'xstate/lib/interpreter';

export enum CycleStep {
  Still = 'still',
  Prepare = 'prepare',
  Process = 'process',
}

export interface Cycle {
  reset(): void;
  next(): CycleStep;
  readonly value: CycleStep;
}

export const createCycle = (): Cycle => {
  let service = interpret(
    machine({
      initial: CycleStep.Process,
      states: {
        still: {
          on: {
            next: CycleStep.Prepare,
          },
        },
        prepare: {
          on: {
            next: CycleStep.Process,
          },
        },
        process: {
          on: {
            next: CycleStep.Still,
          },
        },
      },
    }),
  ).start();

  let value: CycleStep = CycleStep.Process;

  return {
    reset() {
      service = service.init();
    },
    next(): CycleStep {
      value = service.send('next').value as CycleStep;
      return value;
    },
    get value() {
      return value;
    },
  };
};
