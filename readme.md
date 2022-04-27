# Entity Component System and Dependency Injection Gone Wild

> Showcasing the decoupling powers of ECS and DI in game dev

This is an example of using Dependency Injection and an Entity Component System to allow shared game logic that can then be run with multiple frameworks just by adding some glue code.

The game is a basic and barebones version of Arkanoid, Breakout, or Brick Breaker.

The 4 frameworks that this is running on is:

- Phaser 3
- Pixi
- React
- Three

## Getting Started

This project uses Vite.js and has 4 entry points. The main one (index.html) is for Phaser 3 then each additional framework has its own HTML page.

Clone the repository and run:

```
npm run dev
```

Head over to [http://localhost:3000](http://localhost:3000) to see the Phaser 3 game running. Visit the other HTML pages to see the others.

You'll notice that making any change in the the game logic located in the `src/game` folder will be reflected in all versions unless a version has overrode a container binding.

## License

[MIT License](https://github.com/ourcade/ecs-dependency-injection/blob/master/LICENSE)
