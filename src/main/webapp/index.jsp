<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Olevegic lab</title>
        <link rel="stylesheet" href="styles.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200&family=Roboto+Mono:wght@200&display=swap"
            rel="stylesheet">
        <link rel="icon" type="image/x-icon" href="favicon.gif">
    </head>

    <body>
        <div class="header">
            <div class="header-container">
                <a href="https://t.me/olevegic">
                    olevegic.
                </a>
                <div>
                    <div>
                        Селянта Олег P3214
                    </div>
                    <div>
                        Кешишян Давид P3214
                    </div>
                    <div>
                        Вариант 2478
                    </div>
                </div>
            </div>
        </div>

        <div class="main">
            <div class="flex-container">
                <div class="container">
                    <div class="main-container">

                        <canvas id="canvas"></canvas>

                        <div class="choice">
                            <div class="uni-choice">
                                <h3>Choose X:</h3>
                                <input type="text" id="x-input" placeholder="-3 to 3" maxlength="15" />
                            </div>

                            <div class="uni-choice">
                                <h3>Choose Y:</h3>
                                <input type="text" id="y-input" placeholder="-5 to 5" maxlength="15" />
                            </div>
                            <div class="uni-choice">
                                <h3>Choose R:</h3>
                                <input type="text" id="r-input" placeholder="2 to 5" maxlength="15" />
                            </div>
                        </div>
                    </div>
                    <div class="main-btns">
                        <div class="btns-c">
                            <div id="submit-button">
                                submit
                            </div>
                            <div id="clearButton">
                                clear
                            </div>
                        </div>

                    </div>

                    <div class="result-table">
                        <div class="row head">
                            <div class="x">x</div>
                            <div class="y">y</div>
                            <div class="r">r</div>
                            <div class="ct">current time</div>
                            <div class="et">execute time</div>
                            <div class="result">result</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="status-container" class="status-container" style="display: none;">
                <p id="status-text" class="status-text">Статус: Не подтверждено</p>
            </div>
        </div>
        <div class="custom-alert">
            Alert
        </div>
        <script src="js.js"></script>
    </body>

    </html>