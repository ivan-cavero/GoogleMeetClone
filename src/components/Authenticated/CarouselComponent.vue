<template>
  <div class="carousel">
    <div class="carousel-item-container">
      <div
        class="carousel-item"
        v-for="(item, index) in items"
        :key="index"
        :class="{ active: index === currentIndex }"
      >
        <div class="carousel-content">
          <div class="carousel-image">
            <img :src="item.image" :alt="item.title" />
          </div>
          <div class="carousel-info">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <div class="carousel-lines">
              <div
                class="carousel-line"
                v-for="(item, index) in items"
                :key="index"
                :class="{ active: index === currentIndex }"
              >
                <div
                  class="carousel-line-fill"
                  :style="{ width: progressBarWidth(index) }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="arrow left-arrow" @click="previous(true)">
      <font-awesome-icon :icon="'fa-chevron-left'" />
    </button>
    <button class="arrow right-arrow" @click="next(true)">
      <font-awesome-icon :icon="'fa-chevron-right'" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'CarouselComponent',
  data () {
    return {
      currentIndex: 0,
      isPaused: false,
      autoPlayInterval: null,
      progressInterval: null,
      progress: Array.from({ length: 2 }, () => 0),
      items: [
        {
          image:
            'https://www.gstatic.com/meet/meet_google_one_carousel_promo_icon_0f14bf8fc61484b019827c071ed8111d.svg',
          title: 'Access premium Meet features',
          description:
            'Enjoy longer group video calls, noise cancellation, and more benefits with a Premium Google One plan.'
        },
        {
          image:
            'https://www.gstatic.com/meet/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg',
          title: 'Get a shareable link',
          description:
            'Tap New Meeting to generate a link that you can share with the people you want to meet with.'
        }
      ]
    }
  },
  mounted () {
    this.handleAutoPlay(20)
  },
  beforeUnmount () {
    clearInterval(this.autoPlayInterval)
  },
  methods: {
    updateProgress (interval) {
      clearInterval(this.progressInterval)

      this.progressInterval = setInterval(() => {
        this.progress = this.progress.map((p, i) =>
          i === this.currentIndex ? (p + 100 / interval) % 100 : p
        )
      }, 1000)
    },
    resetProgress () {
      this.progress = this.progress.map((value, index) => {
        return index === this.currentIndex ? value : 0
      })
    },
    handleAutoPlay (interval) {
      clearInterval(this.autoPlayInterval)
      this.updateProgress(interval)

      this.autoPlayInterval = setInterval(() => {
        this.next()
        this.updateProgress(20)
        this.handleAutoPlay(20)
      }, interval * 1000)
    },
    previous (userInitiated = false) {
      if (userInitiated) {
        this.isPaused = true
        this.handleAutoPlay(60)
      }

      this.currentIndex === 0
        ? (this.currentIndex = this.items.length - 1)
        : this.currentIndex--

      this.resetProgress()
    },
    next (userInitiated = false) {
      if (userInitiated) {
        this.isPaused = true
        this.handleAutoPlay(60)
      }

      this.currentIndex === this.items.length - 1
        ? (this.currentIndex = 0)
        : this.currentIndex++

      this.resetProgress()
    },
    progressBarWidth (index) {
      return this.progress[index] + '%'
    }
  }
}
</script>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-item-container {
  position: relative;
  width: 400px;
  height: 400px;
  display: flex;
}

.carousel-item {
  flex: 0 0 100%;
  display: none;
  position: relative;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.carousel-item.active {
  display: block;
  opacity: 1;
}

.carousel-image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.carousel-item img {
  border-radius: 50%;
  object-fit: cover;
  height: 20.625rem;
  width: 20.625rem;
}

.carousel-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.carousel-info {
  text-align: center;
}

.carousel-info h3 {
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  line-height: 2rem;
  font-size: 1.5rem;
  letter-spacing: 0;
  font-weight: 400;
  margin-top: 1rem;
  margin-bottom: 0.6rem;
}

.carousel-info p {
  font-family: Roboto, Arial, sans-serif;
  line-height: 1.25rem;
  font-size: 0.875rem;
  letter-spacing: 0.0142857143em;
  font-weight: 400;
  margin: 0 3rem;
}
.carousel-lines {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.carousel-line {
  width: 8%;
  height: 4px;
  margin: 0 3px;
  border-radius: 50px;
  background-color: rgba(0, 0, 0, 0.144);
  position: relative;
}

.carousel-line-fill {
  height: 100%;
  background-color: rgb(98, 177, 255);
  position: absolute;
  border-radius: 50px;
  left: 0;
  top: 0;
  width: 0;
}

.arrow {
  position: absolute;
  top: calc(50% - 40px);
  background-color: white;
  border: none;
  cursor: pointer;
  z-index: 1;
  transition: transform 0.3s ease;
}

.left-arrow {
  left: -10px;
}

.right-arrow {
  right: -10px;
}

.arrow:hover {
  transform: translateX(-5px);
}

.right-arrow:hover {
  transform: translateX(5px);
}
</style>
