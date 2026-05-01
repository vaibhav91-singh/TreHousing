<template>
  <div class="faq-main">
    <div class="faq">
      <div class="faq-title">
        <h1>FAQ's</h1>
      </div>
      <div class="accordion">
        <div v-for="(item, index) in faqs" :key="index" class="accordion-item">
          <div class="accordion-header" @click="toggleAccordion(index)">
            <h2>{{ item.question }}</h2>
            <div class="arrow-icon">
              <span class="arrow" :class="{ up: activeIndex === index, down: activeIndex !== index }"></span>
            </div>
          </div>
          <div class="accordion-content" :class="{ active: activeIndex === index }">
  <p>{{ item.answer }}</p>
</div>

        </div>
      </div>
    </div>

    <!--  -->
  </div>
</template>

<script>
export default {
  name: "FAQ",
  data() {
    return {
      activeIndex: null,
      faqs: [
      { question: "Why you should book airtickets from WebsiteName website?", answer: "WebsiteName offers best deals and customer support." },
        { question: "What is the best possible way to buy air tickets at a reasonable cost?", answer: "Book in advance, compare prices, and use discount codes." },
        { question: "Do you offer last-minute airtickets?", answer: "Yes, last-minute deals are available based on seat availability." },
        { question: "How to search for the best deal or find the latest offer on WebsiteName?", answer: "Use the search feature and subscribe to our newsletter for updates." },
        { question: "Can I book round-trip or one-way air tickets?", answer: "Yes, you can book Lorem ipsum dolor sit amet" },
       
      ],
    
    };
  },
  methods: {
    toggleAccordion(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },
  },
};
</script>

<style scoped>


.faq-main {
 
  padding: 20px;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
  /* background-color: #F0E002; */
  padding: 3vh 5vw 0;
  background-color: white;
  margin-bottom:20px;

}

.faq-title h1 {
  font-weight: 600;
  font-size: 24px;
  line-height: 29.05px;
  font: Inter;
  color: #000000;
}


.accordion {
  width: 100%;
  max-width: 100%;
  /* margin: auto; */
  margin-top: 30px;
}

.accordion-item {
  margin-bottom: 10px;
  padding: 10px;
  color: black;
  box-shadow: 0px 2px 10px #00000040;
}

.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  min-height: 100%;
  max-height: 100%;
 
  /* padding: 0 20px; */
}
.accordion-header h2
{
  font-size: 20px;
  padding: 5px 10px;
  font-weight: 600;
}
.arrow-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;  
  border-radius: 50%;
}

.arrow {
  display: block;
  width: 10px;
  height: 10px;
  border: solid black;
  border-width: 0 3px 3px 0; 
  transform: rotate(45deg);
}

.arrow.up {
  transform: rotate(-135deg);
}

.arrow.down {
  transform: rotate(45deg);
}

.accordion-content {
  max-height: 0;
  max-height: 0;
  overflow: hidden;
  padding: 0 10px;
    /* transition: max-height 0.0s ease-in-out, padding 0.3s ease-in-out; */

}

.accordion-content.active {
  max-height: 100%; /* Large enough to fit content */
  padding: 10px; /* Restore padding */
}

.accordion-content p {
  margin: 5px 0;
  font-weight: 400;
  color: black;
  padding: 0 20px;
  font-size: 18px;
}



@media (max-width: 768px) {
  .faq-main {
    /* padding: 10px; */
    padding: 3vh 5vw 0;
  }

.accordion-header h2
{
  font-size: 18px;
  padding: 5px 10px;
}
.accordion-content p
{
  font-size: 16px;
}

.arrow-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;  
  border-radius: 50%;
}

.arrow {
  display: block;
  width: 10px;
  height: 10px;
  border: solid rgb(61, 61, 61);
  border-width: 0 3px 3px 0; 
  transform: rotate(45deg);
}
 
}

@media (max-width: 480px) {
   
.accordion-header h2
{
  font-size: 16px;
  padding: 0px ;
}
.accordion-content p
{
  font-size: 14px;
  margin: 0;
  padding:0;

}

.accordion-header
{

  padding:0;
  margin:0;
}
}
</style>