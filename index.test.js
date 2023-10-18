const { Comment, Like, Post, Profile, User } = require("./index");
const { db } = require('./db/connection.js');
const userSeed = require("./seed/users.json")
const profileSeed = require("./seed/profiles.json")
const postSeed = require("./seed/posts.json")

describe('Social Sequelzie Test', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the test suite is run
        await db.sync({ force: true });
        
        // Seed Data
        await User.bulkCreate(userSeed)
        await Profile.bulkCreate(profileSeed)
        await Post.bulkCreate(postSeed)

    })

    // Write your tests here
    
    test("can create a user", async function() {
        const user =  await User.create({username: "Phil", email: "Phil23@gmail.com"})
        expect(user.username).toBe("Phil");
    })
{
    test("user has profile", async () => {
        // get a user
        const user = await User.findByPk(6)
        // choose a profile
        const p1 = await Profile.findByPk(2)
        // assigned a user a profile 
        // const userProfile = await user.setProfile(p1)
        await user.setProfile(p1)
        const userProfile = await user.getProfile()
        
        console.log(JSON.stringify(user))
        expect(userProfile.bio).toBe("I love to travel")
    })

   
    test("user has many posts", async () => {
        // Get a user
        const user = await User.findByPk(6)
        // Get a post
        const post = await Post.findByPk(1)
        const post2 = await Post.findByPk(2)

        // Assign user a post
        await user.setPosts([post, post2])
        const userPosts = await user.getPosts()

        console.log(JSON.stringify(userPosts, null, 2))
        
        expect(userPosts[0].title).toBe("Hiking in Yosemite")
    })
   }

})