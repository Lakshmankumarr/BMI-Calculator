/* ===================================
   DOM ELEMENTS
=================================== */

const heightInput =
document.getElementById(
    "height"
);

const weightInput =
document.getElementById(
    "weight"
);

const ageInput =
document.getElementById(
    "age"
);

const genderInput =
document.getElementById(
    "gender"
);

const calculateBtn =
document.getElementById(
    "calculateBtn"
);

const bmiValue =
document.getElementById(
    "bmiValue"
);

const bmiCategory =
document.getElementById(
    "bmiCategory"
);

const healthTip =
document.getElementById(
    "healthTip"
);

const currentBMI =
document.getElementById(
    "currentBMI"
);

const healthStatus =
document.getElementById(
    "healthStatus"
);

const idealWeight =
document.getElementById(
    "idealWeight"
);

const totalRecords =
document.getElementById(
    "totalRecords"
);

const historyContainer =
document.getElementById(
    "historyContainer"
);

const emptyState =
document.getElementById(
    "emptyState"
);

/* ===================================
   STORAGE
=================================== */

let bmiHistory =
JSON.parse(
    localStorage.getItem(
        "bmiHistory"
    )
) || [];

/* ===================================
   BMI CATEGORY
=================================== */

function getCategory(bmi)
{
    if(bmi < 18.5)
    {
        return {
            category:
            "Underweight",

            tip:
            "Increase calorie intake and maintain a balanced diet."
        };
    }

    if(bmi < 25)
    {
        return {
            category:
            "Normal",

            tip:
            "Maintain your healthy lifestyle and exercise regularly."
        };
    }

    if(bmi < 30)
    {
        return {
            category:
            "Overweight",

            tip:
            "Reduce processed foods and increase physical activity."
        };
    }

    return {
        category:
        "Obese",

        tip:
        "Consult a healthcare professional and focus on weight management."
    };
}

/* ===================================
   IDEAL WEIGHT
=================================== */

function calculateIdealWeight(height)
{
    const min =
    (
        18.5 *
        (height / 100) *
        (height / 100)
    ).toFixed(1);

    const max =
    (
        24.9 *
        (height / 100) *
        (height / 100)
    ).toFixed(1);

    return `${min} - ${max} kg`;
}

/* ===================================
   SAVE DATA
=================================== */

function saveData()
{
    localStorage.setItem(
        "bmiHistory",
        JSON.stringify(
            bmiHistory
        )
    );
}

/* ===================================
   DASHBOARD
=================================== */

function updateDashboard()
{
    totalRecords.textContent =
    bmiHistory.length;

    if(
        bmiHistory.length === 0
    )
    {
        currentBMI.textContent =
        "0";

        healthStatus.textContent =
        "-";

        idealWeight.textContent =
        "-";

        return;
    }

    const latest =
    bmiHistory[
        bmiHistory.length - 1
    ];

    currentBMI.textContent =
    latest.bmi;

    healthStatus.textContent =
    latest.category;

    idealWeight.textContent =
    latest.idealWeight;
}

/* ===================================
   RENDER HISTORY
=================================== */

function renderHistory()
{
    historyContainer.innerHTML =
    "";

    if(
        bmiHistory.length === 0
    )
    {
        emptyState.style.display =
        "block";

        updateDashboard();

        return;
    }

    emptyState.style.display =
    "none";

    bmiHistory
    .slice()
    .reverse()
    .forEach(
    record => {

        const card =
        document.createElement(
            "div"
        );

        card.classList.add(
            "history-card"
        );

        card.innerHTML =

        `
        <p>
            <strong>Date:</strong>
            ${record.date}
        </p>

        <p>
            <strong>BMI:</strong>
            ${record.bmi}
        </p>

        <p>
            <strong>Category:</strong>
            ${record.category}
        </p>

        <p>
            <strong>Height:</strong>
            ${record.height} cm
        </p>

        <p>
            <strong>Weight:</strong>
            ${record.weight} kg
        </p>
        `;

        historyContainer
        .appendChild(
            card
        );
    });

    updateDashboard();
}

/* ===================================
   CALCULATE BMI
=================================== */

function calculateBMI()
{
    const height =
    Number(
        heightInput.value
    );

    const weight =
    Number(
        weightInput.value
    );

    const age =
    Number(
        ageInput.value
    );

    const gender =
    genderInput.value;

    if(
        !height ||
        !weight ||
        !age ||
        !gender
    )
    {
        alert(
            "Please fill all fields."
        );

        return;
    }

    const bmi =
    (
        weight /
        (
            (height / 100) *
            (height / 100)
        )
    ).toFixed(1);

    const result =
    getCategory(bmi);

    const ideal =
    calculateIdealWeight(
        height
    );

    bmiValue.textContent =
    bmi;

    bmiCategory.textContent =
    result.category;

    healthTip.textContent =
    result.tip;

    const record = {

        id:
        Date.now(),

        height,

        weight,

        age,

        gender,

        bmi,

        category:
        result.category,

        idealWeight:
        ideal,

        date:
        new Date()
        .toLocaleString()
    };

    bmiHistory.push(
        record
    );

    saveData();

    renderHistory();

    heightInput.value = "";
    weightInput.value = "";
    ageInput.value = "";
    genderInput.value = "";
}

/* ===================================
   EVENT LISTENERS
=================================== */

calculateBtn
.addEventListener(
    "click",
    calculateBMI
);

/* ===================================
   INITIAL LOAD
=================================== */

renderHistory();