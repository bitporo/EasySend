import {
  definePreset
} from '@primevue/themes';
import Aura from '@primevue/themes/aura';
export const Noir = definePreset(Aura, {
  semantic: {
    colorScheme: {
      primary: {
        0: '#ffffff',
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
        surface: {
          0: '#ffffff',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}'
        },
        app: {
          background: '{surface.50}'
        },
        primary: {
          color: '{primary.950}',
          contrastColor: '{primary.50}',
          hoverColor: '{primary.800}',
          activeColor: '{primary.700}',
          secondaryColor: '{primary.100}',
        },
        highlight: {
          background: '{primary.950}',
          focusBackground: '{primary.700}',
          color: '#ffffff',
          focusColor: '#ffffff'
        }
      },
      dark: {
        surface: {
          0: '#ffffff',
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
        content: {
          background: '{surface.900}'
        },
        app: {
          background: '{surface.950}',
        },
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