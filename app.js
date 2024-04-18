const url =
	"https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink";
const options = {
	method: "POST",
	headers: {
		"content-type": "application/json",
		"X-RapidAPI-Key": "36b217c547mshbf89160bf76fbcep14cc50jsn45e464e420d5",
		"X-RapidAPI-Host": "social-download-all-in-one.p.rapidapi.com",
	},
	body: JSON.stringify({
		url: "",
	}),
};

const input = document.querySelector("input");
const button = document.querySelector("button");
const thumbImg = document.querySelector("img");
const title = document.querySelector(".title");
const duration = document.querySelector(".duration");
const downloadLink = document.querySelector(".downloadLink");
const author = document.querySelector(".author");

function secondsToMinutesAndSeconds(seconds) {
	// Calculate the number of minutes
	var minutes = Math.floor(seconds / 60);

	// Calculate the remaining seconds
	var remainingSeconds = seconds % 60;

	// Return the result as a string in the format "m:s"
	return minutes + ":" + remainingSeconds;
}

async function download() {
	try {
		const newUrl = input.value;
		const bodyData = JSON.parse(options.body);
		bodyData.url = newUrl;
		options.body = JSON.stringify(bodyData);

		const response = await fetch(url, options);
		const result = await response.json();
		console.log(result);

		// Clear previous content
		thumbImg.src = "";
		title.innerHTML = "";
		duration.innerHTML = "";
		author.innerHTML = "";
		downloadLink.innerHTML = ""; // Clear previous download links

		thumbImg.src = result.thumbnail;
		title.innerHTML = result.title;
		duration.innerHTML = secondsToMinutesAndSeconds(result.duration);
		author.innerHTML = result.author;
		// for 360p quality
		// q1.href = result.medias[0].url;
		// quality.innerHTML = result.medias[0].quality;
		// type.innerHTML = result.medias[0].type;

		result.medias.forEach((media) => {
			const downloadLinkContainer = document.createElement("div");

			const link = document.createElement("a");

			link.href = media.url;
			link.textContent = media.quality;

			downloadLinkContainer.appendChild(link);

			downloadLink.appendChild(downloadLinkContainer);
		});
	} catch (error) {
		console.error(error);
	}
}

button.addEventListener("click", () => {
	download();
});
