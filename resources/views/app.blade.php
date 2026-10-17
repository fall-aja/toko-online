<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RupaKala — Dashboard Pengguna</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,500;1,6..72,600;1,6..72,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    <style>
        body {
            font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            background-color: #faf9f6;
            color: #1c1917;
        }
        .font-serif-italic {
            font-family: 'Newsreader', serif;
            font-style: italic;
        }
    </style>
</head>
<body class="bg-[#faf9f6] text-stone-900 min-h-screen antialiased selection:bg-stone-900 selection:text-stone-50">
    <div id="root"></div>
</body>
</html>
