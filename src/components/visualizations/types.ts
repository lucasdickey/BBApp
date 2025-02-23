import {BreathingPhase} from '../../types';

export interface VisualizationProps {
  phase: BreathingPhase;
  timeRemaining: number;
  totalTime: number;
  isActive: boolean;
}
