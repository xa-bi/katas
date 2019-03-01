<?php
// Number of People in the Bus
// https://www.codewars.com/kata/5648b12ce68d9daa6b000099

function number($bus_stops) {
  $people_in_bus = 0;
  foreach($bus_stops as $bus_stop) {
    list($in, $out) = $bus_stop;
    if (is_int($in))  $people_in_bus += $in;
    if (is_int($out)) $people_in_bus -= $out;
  }
  return $people_in_bus;
}