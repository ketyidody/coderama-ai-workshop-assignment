# Prompts history
## 1. prompt init
#### Tool: Claude Code
#### Context: Project setup
### Prompt:
```
/init
```
### Result:
CLAUDE.md was created

## 2. prompt: create a prp file

> create a prp file for me where I can put the basic prompt response pattern
### Result:
prompt-response-pattern.md was created

## 3. prompt: create a prp file content
#### Tool: ChatGPT
#### Context: Project setup
### Prompt:
```
write me PRP for my next application.
The application is a frontend only app. I will do it in Vue3.
The application is basically a public search for github.
```
### Result:
I had to prompt again to give me it in a markup language but that generated the same content, so I prompted ChatGPT with the following: 
```
yes but I can't copy the whole thing. Please output it as a markdown code
```

## 4. prompt: creating a vue app
#### Tool: Claude Code
#### Context: Project setup
### Prompt:
```
Create a basic vue app
```
### Result:
Claude created the whole application with all the templates and basic functionality

## 5. prompt: update of public profile page
#### Tool: Claude Code
#### Context: Project setup
### Prompt:
```
Update the display publi profile page to show the following info:
Avatar, Full name, username
Bio, location, website
Stats: Public Repos | Followers | Following
Join date
Repos count
```
### Result:
Claude added the missing information to the public profile page

## 6. prompt: page responsiveness
#### Tool: Claude Code
#### Context: Project responsiveness
### Prompt:
```
All the pages must be responsive, mobile, tablet and desktop. Update the design to have full responsiveness.
```
### Result:
Claude updated the pages with responsive design.

## 7. prompt: light mode/dark mode
#### Tool: Claude Code
#### Context: Visuals
### Prompt:
```
Create a button to change theme for the application. There should be two possible themes: light mode and dark mode. 
```
### Result:
The whole page is now in dark mode, there is button in the top right corner which doesn't change anything except the icon on itself

## 8. prompt: light mode/dark mode functionality
#### Tool: Claude Code
#### Context: Visuals
### Prompt:
```
Now add the functionality to the button, when pressed, toggle between dark/light mode 
```
### Result:
Now the button for switching dark/light mode is working. I know that my previous prompt wasn't clear enough.

## 9. prompt: OAuth Login button
#### Tool: Claude Code
#### Context: OAuth Login
### Prompt:
```
Create me a Login button ("Sign in with GitHub") which will log the user into Github through OAuth authentication (whole OAuth flow). 
Create the whole session management (login/logout)
```
### Result:
Button was added there, when clicked it forwarded me to github login, but after logging in I was stuck on an empty page.


## 10. prompt: Fix OAuth login
#### Tool: Claude Code
#### Context: OAuth Login
### Prompt:
```
When clicking to the login button it takes me to github login page, but after logging in I'm stuck here: https://github.com/login/oauth/authorize?client_id=undefined&redirect_uri=http://localhost:5173/auth/callback&scope=user:email&state=hngfcx
Please check and fix this issue.
```
### Result:
Well, it didn't fix anything, but seems that https://github.com/login/oauth/authorize will give me a 404, so this might not be the AI's fault
EDIT: This fixed it, I just had to read the output from Claude, and follow the instructions how to get the client_id and client_secret

## 11. prompt: Create the protected dashboard route
#### Tool: Claude Code
#### Context: Protected dashboard route
### Prompt:
```
Create a protected dashboard for the logged in user (replace the current public profile route). For this user, the profile will be the same, but in the repos list add the following data:
Repo name (link to GitHub)
Description
Stars count
Primary language
Last updated
```
### Result:
Created the /dashboard page, everything looks good.

## 12. prompt: Git commit
#### Tool: Claude Code
#### Context: git commit
### Prompt:
```
Here is the repo for Git: git@github.com:ketyidody/coderama-ai-workshop-assignment.git. Please commit and push this project to the main branch of this commit.
```
