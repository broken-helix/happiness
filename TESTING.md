# **Happy Hacks Testing Documentation**

## **Table of contents**
 - [**HTML Validation**](#html-validation)
 - [**CSS Validation**](#css-validation)
 - [**Python Validation**](#python-validation)
 - [**Lighthouse**](#lighthouse)
 - [**Contrast**](#contrast)

<hr>

## **HTML Validation**

All HTML code has been run through the [W3C - HTML](https://validator.w3.org/) validator.  The only errors appear to be confusion over the use of Django.

#### **Index.html**
![HTML Team Page](/static/docs/w3c_about_team.jpg)

#### **Events.html**
![HTML Base Page](/static/docs/w3c_base_html.jpg)

<hr>

## **CSS Validation**

All CSS code has been run through the [W3C - CSS](https://jigsaw.w3.org/css-validator/) validator.  There was a minor error with text-wrap in style.css, although it does function as intended.

![CSS Validator Style.css](/static/docs/w3c_css_style_css.jpg)

![CSS Validator Style.css](/static/docs/w3c_css_random_post_css.jpg)

<hr>

## **Python Validation**

All Python code has been run through the [CI PEP8 Testing](https://pep8ci.herokuapp.com/) validator and has returned no errors, results can be viewed below:

#### **admin.py**
![admin-py](/static/docs/python_testing_admin_py.jpg)

#### **apps.py**
![app-py](/static/docs/python_testing_apps_py.jpg)

#### **forms.py**
![forms-py](/static/docs/python_testing_forms_py.jpg)

<hr>

## **Lighthouse**
- The lighthouse score results can be found below.

![Lighthouse](/static/docs/lighthouse.jpg)

![Lighthouse](/static/docs/lighthouse_add_hack.jpg)

![Lighthouse](/static/docs/lighthouse_allhacks.jpg)

![Lighthouse](/static/docs/lighthouse_index.jpg)

<hr>

## **Contrast Checks**

Contrast checks were carried out.  Errors were found, but the checker appears to get confused about which background the text is being checked against.

![Contrast](/static/docs/lighthouse_team_contrast.jpg)


