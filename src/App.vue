<template>
  <div id="app">
    <h1>UK's Energy Mix</h1>
    <form v-on:submit.prevent="handleSubmit">
      <label for="startTime" id="startTimeLabel">From:</label>
      <input type="datetime-local" id="startTime" name="startTime" v-model="startTime">
      <label for="endTime" id="endTimeLabel">To:</label>
      <input type="datetime-local" id="endTime" name="endTime" v-model="endTime">
      <input type="submit" id="submit">
    </form>
   <chart type="PieChart" :data="chartData" :options="chartOptions" id="piechart"/>
  </div>
</template>

<script>
import {GChart} from 'vue-google-charts'

export default {
  name: 'App',
  data () {
    return {
      chartData: [],
      chartOptions: {
          pieHole: 0.4,
          colors: ['#ffe8d7', '#ffe8d7', '#feba89', '#ffa362', '#ff8c3a', '#ff7513', '#eb6100', '#c45100', '#9c4100'],
          backgroundColor: 'fff7f1',
          fontName: 'Avenir',
          pieSliceText: 'none',
          legend: {
            position: 'labeled',
          },    
      },
      startTime: null,
      endTime: null
    }
  },
  components: {
    'chart': GChart
  },
   async mounted() {
    const res =  await fetch('https://api.carbonintensity.org.uk/generation')
    const energy = await res.json()
    this.chartData = this.convertEnergyData(energy.data.generationmix)
    // this.chartData = this.convertEnergyData(this.chartData)
    // this.startTime = energy.data.from
    // this.endTime = energy.data.to
  },
  
  methods: {
    convertEnergyData: function(arrayOfObjects) {
      let array = [];
      array.push(Object.keys(arrayOfObjects[0]))
      arrayOfObjects.forEach((object) => {
        array.push(Object.values(object))
      })
      return array
    },
    handleSubmit: async function() {
      const res =  await fetch(`https://api.carbonintensity.org.uk/generation/${this.startTime}/${this.endTime}`)
      const energy = await res.json()
      this.chartData = energy.data.generationmix
      this.chartData = this.convertEnergyData(this.chartData)
    }
  
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#piechart {
  width: 800px;
  height: 500px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
  border-radius: 8px; 
}

h1 {
  text-transform: uppercase;
}

body {
  background-color: #ffe5d1;
}

input {
  font-family: Avenir;
  border: 1px solid white;
  border-radius: 8px;
}

#endTimeLabel {
  margin-left: 20px;
}

label {
  margin-right: 8px;
  font-weight: bold;
}

#submit {
  margin-left: 10px;
}


</style>
