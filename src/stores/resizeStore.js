

import { defineStore } from 'pinia'
export const useResizeStore = defineStore('resizeStore',{
  state:()=>({
    breakPoints:{
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
      ml: 1750,
    },
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    xxl: false,
    ml: false,
    windowWidth: 0,
  }),
  getters: {
    breakPoint: (state)=> {
      return (key) => state[key];
    },
  },
  actions:{
    reloadValues(){
      this.windowWidth = window.innerWidth;
      Object.keys(this.breakPoints).forEach((key)=>{
        this[key] = this.breakPoints[key] <=  this.windowWidth
      });
      console.log("value", this.windowWidth);
    },
    resizeEvent(){
      if(
        (window.innerWidth >= this.breakPoints.xs && !this.xs) ||
        (window.innerWidth >= this.breakPoints.sm && !this.sm) ||
        (window.innerWidth >= this.breakPoints.md && !this.md) ||
        (window.innerWidth >= this.breakPoints.lg && !this.lg) ||
        (window.innerWidth >= this.breakPoints.xl && !this.xl) ||
        (window.innerWidth >= this.breakPoints.xxl && !this.xxl) ||
        (window.innerWidth >= this.breakPoints.ml && !this.ml) ||
        (window.innerWidth <= this.breakPoints.xs && this.xs) ||
        (window.innerWidth <= this.breakPoints.sm && this.sm) ||
        (window.innerWidth <= this.breakPoints.md && this.md) ||
        (window.innerWidth <= this.breakPoints.lg && this.lg) ||
        (window.innerWidth <= this.breakPoints.xl && this.xl) ||
        (window.innerWidth <= this.breakPoints.xxl && this.xxl) ||
        (window.innerWidth <= this.breakPoints.ml && this.ml)
      ){
        this.reloadValues();
      }
      
    },
    setEvent(){
      window.addEventListener('resize',this.resizeEvent);
    },
    removeEvent(){
      window.removeEventListener('resize',this.resizeEvent);

    }
  }
  
});