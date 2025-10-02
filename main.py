#!/usr/bin/env python3
# dynamic_story.py
# A generator that creates a new code-story each time you run it

import random
from dataclasses import dataclass
from typing import List

# ---------------------------------------------------------------------
# Characters and elements
# ---------------------------------------------------------------------
@dataclass
class Developer:
    name: str
    patience: int
    def speak(self, line: str):
        print(f"{self.name}: {line}")

@dataclass
class Bug:
    id: str
    severity: str
    alive: bool = True
    def whisper(self):
        if self.alive:
            print(f"   (bug {self.id} whispers: '{random.choice(whispers)}')")

@dataclass
class Commit:
    message: str
    changes: List[str]
    def seal(self):
        print(f"[commit] {self.message}")
        for c in self.changes:
            print(f"  - {c}")

@dataclass
class Library:
    name: str
    version: str
    def announce(self):
        print(f"<{self.name} v{self.version}> appears with hidden functions.")

# ---------------------------------------------------------------------
# Random content pools
# ---------------------------------------------------------------------
names = ["Alice", "Kai", "Jun", "Elena", "Ravi"]
libraries = ["AmberCore", "PyFlux", "ZenScript", "CodeForge"]
versions = ["1.0.0", "2.7.1", "3.14", "9.99"]
severities = ["minor", "medium", "critical"]
bug_ids = ["B-101", "X-404", "Z-777", "Q-202", "R-505"]
whispers = [
    "Your stack will overflow...",
    "I hide in the shadows of recursion...",
    "Tests cannot catch me...",
    "Null is my weapon...",
    "Memory leaks drip slowly..."
]
commit_messages = [
    "Fix: patch the endless loop of despair",
    "Refactor: cleanse unused imports of the past",
    "Add: a fragile bridge across broken APIs",
    "Chore: silence the compiler’s warnings of doom"
]
changes_pool = [
    "optimize query engine",
    "sanitize input streams",
    "add retry logic for flaky tasks",
    "update outdated dependency",
    "wrap error handling in hope"
]

# ---------------------------------------------------------------------
# Story Generator
# ---------------------------------------------------------------------
def generate_story():
    dev = Developer(name=random.choice(names), patience=random.randint(2, 5))
    lib = Library(name=random.choice(libraries), version=random.choice(versions))
    bugs = [
        Bug(id=random.choice(bug_ids), severity=random.choice(severities))
        for _ in range(random.randint(2, 4))
    ]

    # Scene I
    print("\n--- Scene I: The Awakening Repository ---\n")
    lib.announce()
    dev.speak("Another day, another commit...")
    for b in bugs: b.whisper()

    # Scene II
    print("\n--- Scene II: Conflict ---\n")
    dev.speak("The errors grow louder.")
    for b in bugs:
        if b.severity == "critical":
            dev.patience -= 1
            dev.speak(f"Damn it, {b.id}! You test my patience ({dev.patience} left).")

    # Scene III
    print("\n--- Scene III: The Patch ---\n")
    commit = Commit(
        message=random.choice(commit_messages),
        changes=random.sample(changes_pool, k=3)
    )
    dev.speak("Let’s try this fix...")
    commit.seal()
    for b in bugs:
        if random.random() > 0.5:
            b.alive = False
            print(f"   (bug {b.id} was slain!)")

    # Scene IV
    print("\n--- Scene IV: Epilogue ---\n")
    alive_bugs = [b for b in bugs if b.alive]
    if alive_bugs:
        dev.speak("Some horrors remain, waiting for another day...")
        for b in alive_bugs: b.whisper()
    else:
        dev.speak("All tests green. Tonight, I rest.")
    print("\n--- End of Story ---\n")

# ---------------------------------------------------------------------
if __name__ == "__main__":
    generate_story()
