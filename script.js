document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search-btn");
  const userInputContainer = document.getElementById("user-input-container");
  const progressContainer = document.getElementById("progress-container");
  const easyProgressItem = document.querySelector(".easy-progress-item");
  const mediumProgressItem = document.querySelector(".medium-progress-item");
  const hardProgressItem = document.querySelector(".hard-progress-item");
  const statsCard = document.getElementById("stats-card");
  const userInput = document.querySelector("#user-input");
  const easyLabel = document.querySelector("#easy-level");
  const mediumLabel = document.querySelector("#medium-level");
  const hardLabel = document.querySelector("#hard-level");
  const circle = document.querySelector(".circle");

  searchButton.addEventListener("click", function () {
    const inputValue = userInput.value.trim();
    console.log("Logging Username:", inputValue);
    if (validateUsername(inputValue)) {
      fetchUserDetails(inputValue);
    }
  });

  // Function to fetch user details
  async function fetchUserDetails(inputValue) {
    const url = `https://leetcode-stats-api.herokuapp.com/${inputValue}`;
    try {
      searchButton.textContent = "Searching";
      searchButton.disabled = true;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Unable to fetch the user details...");
      }

      // Data is fetched
      const data = await response.json();
      console.log("Logging Data:", data);
      //console.log(typeof data);
      //object

      displayUserData(data);
    } catch (error) {
      // document.getElementById("stats-container").innerHTML = '<p>No data Found</p>';
      console.log(error);
    } finally {
      searchButton.textContent = "Search";
      searchButton.disabled = false;
    }
  }

  function displayUserData(data) {
    const totalSolved = data.totalSolved;
    const easySolved = data.easySolved;
    const mediumSolved = data.mediumSolved;
    const hardSolved = data.hardSolved;
    const acceptanceRate = data.acceptanceRate;
    const userRanking = data.ranking;
    const totalQues = data.totalQuestions;
    const totalEasyQues = data.totalEasy;
    const totalMediumQues = data.totalMedium;
    const totalHardQues = data.totalHard;

    updateProgress(totalEasyQues, easySolved, easyLabel, easyProgressItem);
    updateProgress(
      totalMediumQues,
      mediumSolved,
      mediumLabel,
      mediumProgressItem
    );
    updateProgress(totalHardQues, hardSolved, hardLabel, hardProgressItem);

    const cardData = [
      { label: "Total Questions Solved : ", value: `${totalSolved}` },
      { label: "Acceptance Rate : ", value: `${acceptanceRate}` },
      { label: "User Ranking : ", value: `${userRanking}` },
    ];

    //console.log(`Acceptance Rate : ${cardData[0].value}`);

    statsCard.innerHTML = cardData
      .map((arrayData) => {
        return `

            <div class = "card">

            <h3>${arrayData.label}</h3>
            <p>${arrayData.value}</p>

            </div>
            
            `;
      })
      .join("");
  }

  // parameters...
  // totalQuestions , questionsSolved , questionLabel , progressItem[easy,medium,hard]
  function updateProgress(totalQues, quesSolved, quesLabel, progressItem) {
    const progressDegree = (quesSolved / totalQues) * 100;
    progressItem.style.setProperty("--progress-degree", `${progressDegree}%`);
    quesLabel.textContent = `${quesSolved}/${totalQues}`;
  }

  // Function to validate username
  function validateUsername(inputValue) {
    if (inputValue === "") {
      alert("Username should not be empty");
      return false;
    }

    const regex = /^[A-Za-z_]+$/;
    const isMatching = regex.test(inputValue);

    if (!isMatching) {
      alert("Invalid username. Only letters are allowed.");
    }

    return isMatching;
  }
});
