#!/bin/sh
set -e
SRC=/app/uploads/tmp_test_submit.cpp
BIN=/app/uploads/tmp_test_submit
INPUT=/app/uploads/1752788277490-217639514-input.txt.txt
OUTPUT=/app/uploads/1752788277491-48888934-output.txt.txt

echo 'Compiling...'
g++ 