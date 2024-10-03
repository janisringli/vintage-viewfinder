console.log("lucky you");

// Array that mimics the list of files in the /posts/ directory
const postsDirectory = [
  "choosing-the-right-film-stock.html",
  "revival-of-film-photography.html",
];

// Function to read content of each post
async function readContent() {
  // shuffle the array
  postsDirectory.sort(() => Math.random() - 0.5);
  for (const post of postsDirectory) {
    // This should be a string, otherwise there's a problem
    const url = post;

    try {
      const response = await fetch("../posts/" + url);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const text = await response.text();
      console.log(text);

      // Pass the HTML content to the post list function
      constructPostList(text, post);
    } catch (error) {
      console.error(error.message);
    }
  }
}

// Function to create a post container with a title and image
function constructPostList(htmlContent, post) {
  const postContainer = document.getElementById("postContainer");
  console.log(postContainer);

  // Parse the HTML content string into a DOM object
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  // Select the <h1> tag for the post title
  const h1Tag = doc.querySelector("h1");

  // Select the first <img> tag for the post image
  const imgTag = doc.getElementById("post-thumbnail");

  // Create a container div for each post
  const postContent = document.createElement("a");
  postContent.href = "../posts/" + post; // Set the href to the post file
  postContent.classList.add("postContent"); // Add a class for styling

  // Create an anchor for the post title
  const postTitle = document.createElement("h2");
  if (h1Tag) {
    // Set the anchor text to the post title
    postTitle.textContent = h1Tag.textContent;
  } else {
    // Fallback if no <h1> found
    postTitle.textContent = "Untitled Post";
  }

  // Append the anchor (title) to the post container
  postContent.appendChild(postTitle);

  // If an image is found, append it to the post container
  if (imgTag) {
    postContent.style.backgroundImage = `url(${imgTag.src})`;
    // const image = document.createElement("img");
    // image.src = imgTag.src; // Use the same image source from the post
    // image.alt = imgTag.alt || "Post image"; // Use the alt text or provide a fallback
    // image.classList.add("post-thumbnail"); // Add a class for styling
    // console.log(imgTag);
    // postContent.appendChild(image); // Append the image to the postDiv
  }

  const snapContainer = document.createElement("section");
  snapContainer.classList.add("postSnap");
  // Append the entire postContent to the main container
  console.log(postContent);
  postContainer.appendChild(snapContainer);
  snapContainer.appendChild(postContent);
}

readContent();
