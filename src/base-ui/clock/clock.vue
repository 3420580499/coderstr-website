<template>
  <div class="container">
    <div class="box">
      <div class="clock">
        <div class="hour">
          <div class="hr" id="hr"></div>
        </div>
        <div class="min">
          <div class="mn" id="mn"></div>
        </div>
        <div class="sec">
          <div class="sc" id="sc"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
const deg = 6

onMounted(() => {
  const hr = document.querySelector("#hr") as HTMLElement
  const mn = document.querySelector("#mn") as HTMLElement
  const sc = document.querySelector("#sc") as HTMLElement
  setInterval(() => {
    const day = new Date()
    const hh = day.getHours() * 30
    const mm = day.getMinutes() * deg
    const ss = day.getSeconds() * deg

    hr.style.transform = `rotateZ(${hh + mm / 12}deg)`
    mn.style.transform = `rotateZ(${mm}deg)`
    sc.style.transform = `rotateZ(${ss}deg)`
  })
})
</script>

<style scoped>
@keyframes animate {
}
.container {
  box-sizing: border-box;
  position: relative;
}
.box {
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  width: 300px;
  height: 300px;
  backdrop-filter: blur(25px);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  animation: animate 5s ease-in-out infinite;
  animation-delay: -2.5s;
  overflow: hidden;
}
.clock {
  box-sizing: border-box;
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(transparent, rgba(255, 255, 255, 0.2)),
    url("@/assets/img/clock.png");
  background-size: cover;
  border-radius: 50%;
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: none;
  border-right: none;
  box-shadow: -10px -10px 20px rgba(255, 255, 255, 0.1),
    10px 10px 20px rgba(0, 0, 0, 0.1), 0px 40px 50px rgba(0, 0, 0, 0.2);
}
.clock::before {
  content: "";
  position: absolute;
  width: 15px;
  height: 15px;
  background: #fff;
  border-radius: 50%;
  z-index: 10000;
}
.hour,
.min,
.sec {
  position: absolute;
}
.hour,
.hr {
  width: 160px;
  height: 160px;
}
.min,
.mn {
  width: 190px;
  height: 190px;
}
.sec,
.sc {
  width: 230px;
  height: 230px;
}
.hr,
.mn,
.sc {
  display: flex;
  justify-content: center;
  position: absolute;
  border-radius: 50%;
}
.hr::before {
  content: "";
  position: absolute;
  width: 8px;
  height: 80px;
  background: #135ce0;
  z-index: 11;
  border-radius: 6px;
}
.mn::before {
  content: "";
  position: absolute;
  width: 4px;
  height: 90px;
  background: #ff105e;
  z-index: 12;
  border-radius: 6px;
}
.sc::before {
  content: "";
  position: absolute;
  width: 2px;
  height: 150px;
  background: #ffcd43;
  z-index: 12;
  border-radius: 6px;
}
</style>
