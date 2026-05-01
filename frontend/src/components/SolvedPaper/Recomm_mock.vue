<template>
  <p class="heading">Recommended Courses for you</p>
  <div class="cards-container">
    <div v-for="(card, index) in Recomm_cards" :key="index" class="card">
      <h2>{{ card.title }}</h2>
      <a :href="card.link" target="_blank">
        <button>View Details</button>
      </a>
    </div>
  </div>
  <p class="heading">Free Mock Tests</p>
  <div class="cards-container">
    <div v-for="(card, index) in Mock_cards" :key="index" class="card">
      <h2>{{ card.title }}</h2>
      <a :href="card.link" target="_blank">
        <button>Start Attempting Free</button>
      </a>
    </div>
  </div>

  
</template>

<script>
export default {
  name: "RecommMock",
  data() {
    return {
      Recomm_cards: [
        { title: "BPSC TRE (11-12) Computer SC", link: "#" },
        { title: "BPSC TRE (9-10) Computer SC", link: "#" },
        { title: "BPSC TRE (6-10) Computer SC", link: "#" },
        { title: "BPSC STET PGT Computer SC ", link: "#" },
      ],
      Mock_cards: [
        { title: "IBPS RRB Scale 2 & 3 Online Course 2025", link: "#" },
        { title: "IBPS RRB Scale 2 & 3 Online Course 2025", link: "#" },
      ],
    };
  },
};
</script>

<style scoped>
.heading{
  font-size: 19px;
  font-weight: bold;
  margin-left: 5%;
}
.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
}

.card {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 2px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 10px;
}

h2 {
  font-size: 1.2rem;
  margin-bottom: 20px;
  text-align: left;
}

button {
  background-color: #000ecf;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #000ecf;
}
</style>
