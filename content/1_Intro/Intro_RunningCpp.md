---
slug: /intro/running-cpp
title: Using C++
author: Nathan Wang, Benjamin Qi
order: 4
---

Using C++ both online and locally (currently for Mac only).

<!-- END DESCRIPTION -->

## Running Online

 * [CSAcademy](https://csacademy.com/workspace/)
   * pretty nice (unless you get "Estimated Queue Time: ...")
 * [Ideone](http://ideone.com/) (used this for a while ...)
   * okay with an ad blocker
   * make sure your code is not public
   * sometimes randomly erases your code when you first create it (so get in the habit of copying your code before creating it!)
 * [OnlineGDB](https://www.onlinegdb.com/)

Of course, you can't use File I/O on these websites (or do a lot of other stuff ...).

## Using C++ Locally (on Mac)

[Clang](https://en.wikipedia.org/wiki/Clang) is the default compiler for Mac OS X, but you should use [G++](https://en.wikipedia.org/wiki/GNU_Compiler_Collection).

### Installation

Open **Terminal** and run

```sh
brew install gcc
```

According to [this](https://stackoverflow.com/questions/30998890/installing-opencv-with-brew-never-finishes) if brew doesn't seem to finish for a long time then 

```sh
brew install gcc --force-bottle
```

probably suffices.

### Confirmation

You should be able to compile with g++ or maybe g++-#, where # is the version number (currently 9). Running the following command:

```sh
g++-9 --version
```

should display something like this:

```
g++-9 (Homebrew GCC 9.2.0_2) 9.2.0
Copyright (C) 2019 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

### Running C++ via Terminal

Consider a simple program such as the following, which we'll save in `name.cpp`.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
  int x; cin >> x;
  cout << "FOUND " << x << "\n";
}
```

It's not hard to [compile & run a C++ program](https://www.tutorialspoint.com/How-to-compile-and-run-the-Cplusplus-program). First we compile `name.cpp` into an executable named `name`.

```sh
g++ name.cpp -o name
```

Then we can execute the program:

```sh
./name
```

If you type an integer `x` and then enter, then the program should produce output. We can write both of these commands in a single line:

```sh
g++ name.cpp -o name && ./name
```

### Redirecting Input & Output

If you want to read input from `inp.txt` and write to `out.txt`, then use the following:

```sh
./name < inp.txt > oup.txt
```

(simple tutorial?)

See "Introductory Problems" for how to do file input and output within the program.

### Adding Shortcuts

Retyping this command gets tedious once we start adding many [command line options](https://developers.redhat.com/blog/2018/03/21/compiler-and-linker-flags-gcc/). See "General - Debugging" for more information about compilation options.

Open your bash profile with a text editor such as gedit (or sublime text).

```sh
brew install gedit
gedit ~/.zshenv
```

You can add aliases and functions here, such as the following to compile and run C++. 

```sh
co() { g++ -std=c++11 -O2 -o $1 $1.cpp -Wall -Wextra -Wshadow -DLOCAL -Wl,-stack_size -Wl,0xF0000000; }
run() { co $1 && ./$1 & fg; }
```

Now you can easily compile and run `name.cpp` from the command line with the following:

```sh
run name
```

Note that all occurrences of `$1` are replaced with `name`.

### Troubleshooting

Make sure you have installed XCode command line tools.

```sh
xcode-select --install # make sure x-code command line tools are installed
softwareupdate --list
softwareupdate -i -a # installs everything
```

## Tools

### IDEs

 * [Geany](https://www.geany.org/)
   * used at IOI
 * [Visual Studio Code](https://code.visualstudio.com/)
 * [XCode](https://developer.apple.com/xcode/)
   * Mac only
 * [Codeblocks](http://www.codeblocks.org/)
   * bad on Mac :(

### Text Editors

 * [Sublime Text 3](https://www.sublimetext.com/)
   * [Editing Build Settings](https://stackoverflow.com/questions/23789410/how-to-edit-sublime-text-build-settings)
   * [FastOlympicCoding Addon](https://github.com/Jatana/FastOlympicCoding)
   * [Sublime Snippets](https://www.granneman.com/webdev/editors/sublime-text/top-features-of-sublime-text/quickly-insert-text-and-code-with-sublime-text-snippets)
   * [Symlink](https://www.sublimetext.com/docs/3/osx_command_line.html) 
     * Using `/usr/local/bin/subl` instead of `~/bin/subl` worked for me on OS X Mojave.
 * [Atom](https://atom.io/)

## Other Useful Links

 * [Intro to Command Line](http://blog.teamtreehouse.com/introduction-to-the-mac-os-x-command-line)
 * [Command Line Shortcuts](https://jonsuh.com/blog/bash-command-line-shortcuts/)
 * [Run Python Script](https://stackoverflow.com/questions/7855996/cant-run-python-py-files-from-terminal-on-mac)
 * [Competitive C++ Style Guide](https://codeforces.com/blog/entry/64218)