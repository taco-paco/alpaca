# Alpaca

## About
Alpaca is your trusty blockchain tour guide, guiding you through Starknet network. 
Inspired by [Ganache UI](https://github.com/trufflesuite/ganache-ui), Alpaca spins up a local [Devnet](https://github.com/0xSpaceShard/starknet-devnet-rs) instance, which is invaluable for testing smart contracts in a development environment.

## Goal
Alpaca's goal is to provide the same user-friendly interface and feature set similar to Ganache UI, such as managing accounts, 
inspecting transactions, and simulating various network conditions, but also can expand on that with features like as L2←→L1 simulations.

## Powered by
React, CSS, MobX, Electron

[**alpaca-addon**](https://www.npmjs.com/package/@taco-paco/alpaca-addon-mac-arm64)

## Setup
For now this project runs only on Macs with ARM64 and x86-64 architectures.
I will add Win x64 [alpaca-addon](https://www.npmjs.com/package/@taco-paco/alpaca-addon-mac-arm64)
support shortly and if this project sees interest, I will add support of other platforms.

If your hardware & OS requirements a met run:
```bash
yarn build
```

and then

```bash
yarn start
```

If your project uses Devnet, you shall be able to seamlessly use this one.
[Example project](https://github.com/taco-paco/starknet-exp).

P.S.

Proper error messages are yet to come, so make sure your port isn't occupied when launching.

## alpaca-addon
alpaca-addon is what really makes this possible. It is an npm package and can be used in any other project.
Under the hood it spins up [starknet-devnet-rs](https://github.com/0xSpaceShard/starknet-devnet-rs).

The code will be published in a separate repo in the near future.

### P.S.
That was a pet project at the beginning in which I poured my soul, but I hope it can evolve in something more. 

I'm not a front-end dev so don't judge me real hard here :). 
And to be honest I realised that "Reacting" & "CSSing" isn't my thing really, but I know there are much better and more passionate people about this in community.
All suggestions and contributions are always welcome.

Want to express my gratitude for Starknet Foundation. 
STRK allocation was really a life-changing moment for me and also a trigger to finally publish this.

UI is very raw and has only fraction of Ganache-UI functionality.
