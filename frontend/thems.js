import {
  definePreset
} from '@primevue/themes';
import Aura from '@primevue/themes/aura';
export const Noir = definePreset(Aura, {
  semantic: {
    colorScheme: {
      primary: {
        50: '{zinc.50}',
        100: '{zinc.100}',
        200: '{zinc.200}',
        300: '{zinc.300}',
        400: '{zinc.400}',
        500: '{zinc.500}',
        600: '{zinc.600}',
        700: '{zinc.700}',
        800: '{zinc.800}',
        900: '{zinc.900}',
        950: '{zinc.950}'
      },
      light: {
        primary: {
          color: '{surface.950}',
          contrastColor: '{surface.50}',
          hoverColor: '{surface.800}',
          activeColor: '{surface.700}',
          secondaryColor: '{surface.100}'
        },
        highlight: {
          background: '{surface.950}',
          focusBackground: '{surface.700}',
          color: '#ffffff',
          focusColor: '#ffffff'
        }
      },
      dark: {
        primary: {
          color: '{surface.400}',
          contrastColor: '{surface.950}',
          hoverColor: '{surface.200}',
          activeColor: '{surface.300}',
          secondaryColor: '{surface.800}'
        },
        highlight: {
          background: '{surface.50}',
          focusBackground: '{surface.300}',
          color: '{surface.950}',
          focusColor: '{surface.950}'
        }
      }
    }
  }
});