const express = require("express")
const app = express();
const mongoose = require("mongoose")
const Mongo_Url = "mongodb://127.0.0.1:27017/wanderlust"
const Listing = require("./models/listing.js")
const path = require("path");
const MethodOverride = require("method-override")
const { log } = require("console");
const ejsMate = require("ejs-mate")

main()
    .then(() => {
        console.log("Connected to DB")
    })
    .catch((err) =>{
        console.log(err)
    })
async function main() {
    await mongoose.connect(Mongo_Url)
}


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({extended: true}))
app.engine('ejs', ejsMate)
app.use(express.static(path.join(__dirname, "/public")))
app.use(MethodOverride("_method"))

app.get("/", (req,res) => {
    res.send("Hi, I am Root")
})
// Index Route
app.get("/listings", async (req,res) =>{
    const AllListing = await Listing.find()
    res.render("listings/index.ejs", {AllListing})
})

// Create Route 
app.get("/listings/new", (req,res) => {
    res.render("listings/new.ejs")
})

// Read Route
app.get("/listings/:id", async (req,res) => {
    let {id} = req.params
    const listing = await Listing.findById(id)
    res.render("listings/show.ejs", {listing})
})

// Create Route
app.post("/listings", async (req,res) => {
    const newListing = new Listing(req.body.listing)
    await newListing.save()
    res.redirect("/listings")
})

// Edit Route
app.get("/listings/:id/edit", async (req,res) => {
    let {id} = req.params
    const listing = await Listing.findById(id)
    res.render("listings/edit.ejs", {listing})
})

// Update Route
app.put("/listings/:id", async (req,res) => {
    let {id} = req.params
    await Listing.findByIdAndUpdate(id, {...req.body.listing})
    res.redirect(`/listings/${id}`)
})

// Delete Route
app.post("/listings/:id/delete", async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    res.redirect("/listings");
});


// app.get("/testListing", async (req,res) => {
//     let SampleListing = new Listing({
//         title: "My home",
//         discription: "Near by Beach",
//         price: 1200,
//         location: "calangute, Goa",
//         country: "India"
//     })

//     await SampleListing.save()
//     console.log("Sample was saved");
//     res.send("Successful testing")
// })

app.listen(8080, () => {
    console.log("Server is listening at port 8080")
})