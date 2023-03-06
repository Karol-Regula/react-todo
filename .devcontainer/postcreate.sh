#!/bin/bash

pushd ./backend
dotnet restore
popd

pushd ./frontend
npm install
popd