<template>
    <div class="element">
        <span>DENTHUB</span>
        <p>A PROJECT BY GROUP-14©
        <br>DIT355 MINI-PROJECT: DISTRIBUTED SYSTEMS
        <br>SOFTWARE ENGINEERING AND MANAGEMENT
        </p>
    </div>
</template>
<script>
const animationEnd = () => {
  const animation = document.getElementById('element')
  const aniClass = animation.getAttribute('class')
  animation.setAttribute('class', aniClass + ' animationEnd')
}
const animEndEvent = new Event('animation_end')
if (document.addEventListener) {
  document.addEventListener('animation_end', animationEnd, false)
} else {
  document.attachEvent('animation_end', animationEnd)
}
setTimeout(() => {
  document.dispatchEvent(animEndEvent)
}, 4000)
</script>
<style>
.element {
  width: 100%;
  height: 100%;
  animation: pulse 3s ease-in;
  position: fixed;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 100px;
  font-family: 'Tomorrow', sans-serif;
  color: #65b2ff;
  animation-fill-mode: both;
}
p{
  font-family: 'Avenir', Helvetica, sans-serif;
  font-style: normal;
  font-size: 12;
  color: #65b2ff;
  text-align: center !important;
  position: fixed;
  top: 70%;
  left: 10% !important;
  right: 10% !important;
}
span {
  margin: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

@keyframes pulse {
  0% {
    background-color: #65b2ff;
  }
  40% {
      background-color: #FFFFFF;
  }
  80% {
    background-color: #FFFFFF;
    opacity: 1;
  }
  100% {
    background-color: #FFFFFF;
    z-index: -5;
    opacity: 0;
  }
}
</style>
