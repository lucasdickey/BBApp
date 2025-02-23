import {Platform} from 'react-native';
import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
  HapticOptions,
} from 'react-native-haptic-feedback';

const hapticOptions: HapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

class HapticService {
  private strength: number = 1;
  private enabled: boolean = true;

  initialize() {
    this.setStrength(1);
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  setStrength(strength: number) {
    this.strength = Math.max(0, Math.min(1, strength));
  }

  private getIntensity() {
    if (this.strength < 0.33) return HapticFeedbackTypes.impactLight;
    if (this.strength < 0.66) return HapticFeedbackTypes.impactMedium;
    return HapticFeedbackTypes.impactHeavy;
  }

  private trigger(type: HapticFeedbackTypes) {
    if (!this.enabled) return;
    ReactNativeHapticFeedback.trigger(type, hapticOptions);
  }

  phaseTransition() {
    this.trigger(this.getIntensity());
  }

  cycleComplete() {
    if (Platform.OS === 'ios') {
      this.trigger(HapticFeedbackTypes.notificationSuccess);
    } else {
      this.trigger(HapticFeedbackTypes.clockTick);
      setTimeout(() => this.trigger(HapticFeedbackTypes.clockTick), 100);
    }
  }

  sessionComplete() {
    if (Platform.OS === 'ios') {
      this.trigger(HapticFeedbackTypes.notificationSuccess);
      setTimeout(() => {
        this.trigger(HapticFeedbackTypes.notificationSuccess);
      }, 150);
    } else {
      this.trigger(HapticFeedbackTypes.clockTick);
      setTimeout(() => this.trigger(HapticFeedbackTypes.clockTick), 100);
      setTimeout(() => this.trigger(HapticFeedbackTypes.clockTick), 200);
    }
  }
}

export const hapticService = new HapticService();
