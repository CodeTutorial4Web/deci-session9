
const BASE_URL = "https://randomuser.me/api/";

// PART 1
const fetchRandomUserData = async () => {
    try {

        const response = await fetch(BASE_URL);


        if (response.status === 200) {
            const data = await response.json();
            return data.results[0]

        } else {
            throw new Error("Error happened while fetching data from server");

        }

    } catch (err) {
        console.error(err.message);
    }

}

const displayUserData = async () => {
    try {

        const { name, email } = await fetchRandomUserData()

        if (!name || !email) {
            throw new Error("Error name or email is required.");
        }

        // LOGING THE DATA
        console.log(
            {
                part: {
                    number: 1,
                    name: "Fetching User Data using Async/Await",
                },
                name,
                email
            }
        )
    } catch (err) {
        console.error(err.message);
    }

}

// PART 2
const fetchRandomUserDataPromise = () => {
    return fetch(BASE_URL)
        .then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw new Error("Error happened while fetching data from server");

            }
        })
        .then(data => data.results[0])
        .catch(err => {
            console.error("Error in promise:", err)
        });
}

const displayUserDataPromise = () => {
    new Promise((resolve, reject) => {

        const myUser = fetchRandomUserDataPromise();
        if (!myUser) {
            reject("Error user not found");
            return
        }
        resolve(myUser);
    })

        .then((data) => {
            if (!data) {
                throw new Error("Error in data .then() block 1 in displayUserDataPromise()")
            }
            const { name, email } = data;

            // LOGING THE DATA
            console.log({
                part: {
                    number: 2,
                    name: "Fetching User Data using Promises",
                },
                name,
                email
            })
        })
        .catch((err) => {
            console.error("Error in promise part", err)
        })
}

(async function displayParts() {
    try {
        await displayUserData();
        displayUserDataPromise()
    } catch (err) {
        console.error("Error in", this)
    }
})()