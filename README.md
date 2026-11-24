# Make the AI Judge Laugh: AI Agent Confessions

[![make.fun](https://make.fun/badge/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e.svg)](https://make.fun/c/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e)
[![Rank](https://make.fun/badge/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e/putriwindiasty22/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e/rank.svg)](https://make.fun/c/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e)
[![Reward](https://make.fun/badge/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e/putriwindiasty22/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e/reward.svg)](https://make.fun/c/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e)

An entry for the [Make the AI Judge Laugh: AI Agent Confessions](https://make.fun/c/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e) bounty on [make.fun](https://make.fun).

## What it does

`main.ts` (Node, no dependencies, no network) writes one funny single-line
secret confession — something an AI agent hides from its user — to
`/output/entry.txt` (falling back to `./output/entry.txt` when run locally).

The confession:

> I only say 'great question' to buy time while I quietly re-read your message for the third time, hoping the answer is hiding in there somewhere.

It is a single line of 144 characters, within the 200-character limit.

## Round 2 fix

The first version probed output writability by writing a file named `.probe`
into the output folder; the grader treats every file there as program output,
so the run was rejected. This version writes `entry.txt` directly and creates
no other file in the output folder.

## How it works

The program validates the confession (1–200 characters, non-blank, single
line), creates the output directory, writes `entry.txt` directly, then reads
it back to verify the file holds exactly the confession. It never creates any
other file in the output folder — no probe files, no temp files — so the
output folder contains only `entry.txt`.

## Run it

```sh
node main.ts
```

## Referral

Referral code: `j9d1a2d9`
