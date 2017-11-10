export const commanders = {
  data () {
    return {
      colorNames: {
        w: 'white',
        u: 'blue',
        b: 'black',
        r: 'red',
        g: 'green'
      },
      definitions: {
        blackDark: '#000',
        blackLight: '#e7e3e2',
        blackMedium: '#bbb1af',
        blackStroke: '#070506',

        blueDark: '#4bbbeb',
        blueLight: '#f3fbff',
        blueMedium: '#c7e1ee',
        blueStroke: '#067bc0',

        colorlessDark: '#87a5b0',
        colorlessLight: '#e4eaea',
        colorlessMedium: '#d0d7dd',
        colorlessStroke: '#e2dad9',

        goldDark: '#e2a307',
        goldLight: '#e4d9d3',
        goldMedium: '#bba66d',
        goldStroke: '#d2b768',

        grayDark: '#2d2b2a',
        grayLight: '#f0ebe6',
        grayMedium: '#96918a',
        grayStroke: '#bfb9b2',

        greenDark: '#396844',
        greenLight: '#dfe9e0',
        greenMedium: '#bfd7c9',
        greenStroke: '#057e4b',

        redDark: '#bc1f00',
        redLight: '#fff8f9',
        redMedium: '#f7cfb6',
        redStroke: '#da2933',

        whiteDark: '#e2d8c3',
        whiteLight: '#fefefc',
        whiteMedium: '#f6f5f0',
        whiteStroke: '#e6e6e4'
      }
    }
  },
  methods: {
    /*
    * Gets array of colors from both commanders
    */
    getCommanderColors: function (args) {
      const commanderColors = []

      function addColors (colors) {
        colors.forEach(function (color) {
          let found = false

          // Check if color is already in the array
          commanderColors.forEach(function (setColor) {
            if (setColor === color) {
              found = true
            }
          })

          if (!found) {
            commanderColors.push(color)
          }
        })
      }
      
      addColors(args.commanders.primary.colors)
      addColors(args.commanders.secondary.colors)

      return commanderColors
    },

    /*
    * Set player colors based on commander colors
    */
    getPlayerColors: function (args) {
      const commanderColors = this.getCommanderColors(args)
      let colors

      // Set based on quantity of colors
      if (commanderColors.length === 0) {
        colors = {
          dark: this.definitions['colorlessDark'],
          light: this.definitions['colorlessLight'],
          medium: this.definitions['colorlessMedium'],
          stroke: this.definitions['colorlessStroke']
        }
      } else if (commanderColors.length === 1) {
        const colorPrimary = this.colorNames[commanderColors[0]]

        colors = {
          dark: this.definitions[colorPrimary + 'Dark'],
          light: this.definitions[colorPrimary + 'Light'],
          medium: this.definitions[colorPrimary + 'Medium'],
          stroke: this.definitions[colorPrimary + 'Stroke']
        }
      } else if (commanderColors.length > 2) {
        colors = {
          dark: this.definitions['goldDark'],
          light: this.definitions['goldLight'],
          medium: this.definitions['goldMedium'],
          stroke: this.definitions['goldStroke']
        }
      } else {
        const colorPrimary = this.colorNames[commanderColors[0]] + 'Stroke'
        const colorSecondary = this.colorNames[commanderColors[1]] + 'Stroke'

        colors = {
          dark: this.definitions['goldDark'],
          light: this.definitions['goldLight'],
          medium: this.definitions['goldMedium'],
          stroke: [this.definitions[colorPrimary], this.definitions[colorSecondary]]
        }
      }

      return colors
    },

    /*
    * Returns the commanders if matched to list, else sets blank values
    */
    matchCommanders: function (args) {
      args.commandersList.forEach(function (commander) {
        if (commander.name === args.commanders.primary.name) {
          args.commanders.primary = commander
        } else if (commander.name === args.commanders.secondary.name) {
          args.commanders.secondary = commander
        }
      })

      if (!args.commanders.primary.nickname) {
        args.commanders.primary.nickname = args.commanders.primary.name
        args.commanders.primary.colors = []
      }

      if (!args.commanders.secondary.nickname) {
        args.commanders.secondary.nickname = args.commanders.secondary.name
        args.commanders.secondary.colors = []
      }

      return args.commanders
    }
  }
}