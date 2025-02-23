import {renderHook, act} from '@testing-library/react-native';
import useBreathingTimer from '../hooks/useBreathingTimer';

// Mock the dependencies
jest.mock('../contexts/SettingsContext', () => ({
  useSettings: () => ({
    settings: {
      phaseDuration: 4,
      numberOfCycles: 4,
    },
  }),
}));

jest.mock('../hooks/useFeedback', () => ({
  useFeedback: () => ({
    triggerPhaseFeedback: jest.fn(),
    triggerCycleComplete: jest.fn(),
    triggerSessionComplete: jest.fn(),
  }),
}));

describe('useBreathingTimer', () => {
  it('initializes with correct default state', () => {
    const {result} = renderHook(() => useBreathingTimer());

    expect(result.current.state).toEqual({
      currentPhase: 'inhale',
      currentCycle: 1,
      timeRemaining: 4,
      isActive: false,
    });
  });

  it('starts breathing session correctly', () => {
    const {result} = renderHook(() => useBreathingTimer());

    act(() => {
      result.current.startBreathing();
    });

    expect(result.current.state.isActive).toBe(true);
  });
});
