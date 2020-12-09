const { Category } = require("./models/category");
const { Post } = require("./models/post");
const mongoose = require("mongoose");
const config = require("config");
const db = require("./startup/db");

const data = [
  {
    name: "Verse For Today",
    posts: [
      {
        title: "Psalms 19:1-2",
        author: "Jean Baptiste Ntagengwa",
        text:
          "The heavens declare the glory of God; the skies proclaim the work of His hands. Day after day they pour forth speech; night after night they reveal knowledge.",
        createdAt: 1607490000,
        description: "This is taken from the NIV Bible",
      },
      {
        title: "Revelations 21:4",
        author: "Jean Baptiste Ntagengwa",
        text:
          "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.",
        createdAt: 1607490000,

        description: "This is taken from the NIV Bible",
      },
      {
        title: "Psamls 91:1-2",
        author: "Jean Baptiste Ntagengwa",
        text:
          "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the LORD, 'He is my refuge and my fortress, my God, in whom I trust.'",
        createdAt: 1607490000,

        description: "This is taken from the NIV Bible",
      },
      {
        title: "Psamls 27:14",
        author: "Jean Baptiste Ntagengwa",
        text:
          "Wait for the LORD; be strong and take heart and wait for the LORD.",

        createdAt: 1607490000,
        description: "This is taken from the NIV Bible",
      },
      {
        title: "1 Corinthians 13:13",
        author: "Jean Baptiste Ntagengwa",
        text:
          "And now these three remain: faith, hope and love. But the greatest of these is love.",
        createdAt: 1607490000,
        description: "This is taken from the NIV Bible",
      },
      {
        title: "Psamls 23:1-2",
        author: "Jean Baptiste Ntagengwa",
        text:
          "The LORD is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters,",
        createdAt: 1607490000,
        description: "This is taken from the NIV Bible",
      },
      {
        title: "Isaiah 6:8",
        author: "Jean Baptiste Ntagengwa",
        text:
          "Then I heard the voice of the Lord saying, 'Whom shall I send? And who will go for us?' And I said, 'Here am I.Send me!'",
        createdAt: 1607490000,
        description: "This is taken from the NIV Bible",
      },
      {
        title: "Matthew 5:14",
        author: "Jean Baptiste Ntagengwa",
        text:
          "You are the light of the world. A town built on a hill cannot be hidden.",
        createdAt: 1607490000,
        description: "This is taken from the NIV Bible",
      },
      {
        title: "Psamls 23:4",
        author: "Jean Baptiste Ntagengwa",
        text:
          "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
        createdAt: 1607490000,
        description: "This is taken from the NIV Bible",
      },
    ],
  },
  {
    name: "Word Of Encouragement",
    posts: [
      {
        title: "Psalms 19:1-2",
        author: "Jean Baptiste Ntagengwa",
        text:
          "The heavens declare the glory of God; the skies proclaim the work of His hands. Day after day they pour forth speech; night after night they reveal knowledge.",
        createdAt: 1607490000,
        description: "This is taken from the NIV Bible",
      },
    ],
  },
  {
    name: "Passage Summary",
    posts: [
      {
        title: "Revelations 21:4",
        author: "Jean Baptiste Ntagengwa",
        text:
          "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.",
        createdAt: 1607490000,
        description: "This is taken from the NIV Bible",
      },
    ],
  },
  {
    name: "Bible Study",
    posts: [
      {
        title: "Psamls 91:1-2",
        author: "Jean Baptiste Ntagengwa",
        text:
          "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the LORD, 'He is my refuge and my fortress, my God, in whom I trust.'",
        createdAt: 1607490000,
        description: "This is taken from the NIV Bible",
      },
    ],
  },
];

async function seed() {
  await mongoose.connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await Post.deleteMany({});
  await Category.deleteMany({});

  for (let category of data) {
    const { _id: categoryId } = await new Category({
      name: category.name,
    }).save();
    const posts = category.posts.map((post) => ({
      ...post,
      category: { _id: categoryId, name: category.name },
    }));
    await Post.insertMany(posts);
  }

  mongoose.disconnect();

  console.info("Finished!");
}

seed();
