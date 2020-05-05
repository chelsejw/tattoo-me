## Project Post Mortem
Post mortems are important to understand about what happened in a project and actively think about what you learned.

Post-mortems are meant to be a blame-less space open to objective conversation about what went well and what could be improved.

Even in the examples below, where tens of millions of dollars could be lost, the best approach is to think through the series of events that led to the outcome.

Large mistakes are almost never the fault of the developer, but of the sytems and processes in place to prevent errors and problems.

[https://github.com/danluu/post-mortems](https://github.com/danluu/post-mortems)
https://blog.codinghorror.com/the-project-postmortem/



### What to Bring
Please answer the following questions. Take at least 30 minutes to prepare.

#### Approach and Process

##### What in my process and approach to this project would I do differently next time?
- Still not sure if my users and artists should have been two different tables
- My table columns naming conventions could have been better

##### What in my process and approach to this project went well that I would repeat next time?
- Pretty thorough planning of how I wanted the app to look like
- Made use of many bootstrap classes to style it, minimising the need for custom CSS planning / debugging

#### Code and Code Design

##### What in my code and program design in the project would I do differently next time?
- Do more thorough testing while I code. I tend to write many lines/functions at a time before testing anything and I think it makes my code messier. 
- Try to avoid callback hell by using promises, or defining my callbacks outside the arguments, makes it super painful to read

````
 const tattooSearchResults = (req, res) => {
        const hashtagQuery =
            req.query.hashtagId;
        let data = {};
        data.loginData = req.cookies
        let sortOption = req.query.sortBy
        data.query = {
            hashtagId: hashtagQuery,
            sortBy: sortOption,
        };


        //GET DATA TO RENDER HASHTAG OPTIONS.
        db.hashtags.getAllHashtags(
            (err, hashtagResults) => {
                if (err) {
                    return res
                        .status(404)
                        .send(err);
                }

                data.hashtags = hashtagResults;

                //If they are looking at all hashtags, or there are no queries
                if (hashtagQuery === "all" || !hashtagQuery) {

                    db.tattoos.getAllTattoos(sortOption, (err, tattooResults) => {
                        if (err) {
                            return res.status(404).send(err);
                        }
                        data.results = tattooResults;
                        res.render(`tattoos/tattoo-results`, data);
                    });

                } else if (!isNaN(hashtagQuery)) {
                    db.tattoos.getTattoosByHashtag(hashtagQuery, sortOption, (err, tattooResults) => {
                        if (err) {
                            return res.status(404).send(err);
                        }
                        data.results = tattooResults;

                        db.hashtags.getHashtagById(hashtagQuery, (err, result) => {
                            if (err) {
                                return res.status(404).send(err)
                            }
                            data.hashtagName = result.hashtag_name
                            res.render(
                                `tattoos/tattoo-results`,
                                data
                            );

                        })

                    })
                }

            }
        );
    };

````

- Have better naming conventions. I repeat a ton of (err)s and (result)s within my nested callbacks. Also very very inconsistent naming (some controller functions are let, some are const, some functions don't have the word controller in it, some don't have the word callback,)

````
        getArtistRegistration: getArtistRegistrationControllerCallback,
        addArtist: addArtistControllerCallback,
        artistSearch: artistSearchControllerCallback,
        getArtistLoginForm: getArtistLoginFormControllerCallback,
        authenticateArtist: authenticateArtistControllerCallback,
        showArtistPage: showArtistPageControllerCallback,
        updateArtistInfo: updateArtistInfo,
        showEditArtistHashtags: showEditArtistHashtagsController,
        editArtistHashtags: editArtistHashtagsController
````
- If there are errors, fix it 
- For all my status codes I just put 404 cause I wasn't sure which it should be. Again, inconsistency cause some pages I would render an error message view. 

##### What in my code and program design in the project went well? Is there anything I would do the same next time?
- For my AJAX functions most of it were flexible enough to be used across different views
- Separated AJAX scripts for different types of views.

#### WDI Unit 2 Post Mortem
##### What habits did I use during this unit that helped me?
- Planning everything out on an excel sheet before working on the app

##### What habits did I have during this unit that I can improve on?
- Brute force coding, moving on when it works and not thoroughly testing or validation checks
- Terrible and inconsistent naming 

##### How is the overall level of the course during this unit? (instruction, course materials, etc.)
- It's ok but I wasn't sure why components were covered only mid way through our project