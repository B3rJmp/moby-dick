<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Moby Dick (laravel)</title>
    <style lang="css">
        body {
            margin: 0;
        }

        p {
            margin: 0;
        }

        .container {
            padding: 10px;
        }

        #words {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: start;
        }

        .word {
            width: 100%;
            margin-bottom: 20px;
        }

        .bar {
            padding: 5px;
            background-color: orange;
            color: white;
            text-align: right;
            box-sizing: border-box;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Top 100 words in Moby Dick</h1>
        @foreach ($data as $word => $count)
            <div class="word">
                <p>{{ $word }}</p>
                <div class="bar" style="width: {{ round((($count/$topWordCount) * 100),1) }}%">{{ $count }}</div>
            </div>
        @endforeach
    </div>
</body>
</html>
