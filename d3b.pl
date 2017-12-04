use strict;
use Math::PlanePath::SquareSpiral;

my $path = Math::PlanePath::SquareSpiral->new;
my $input_val = 277678;
# my ($x, $y) = $path->n_to_xy($input_val);
# print "coords for input $input_val: $x, $y\n";
# my $manhattan_dist = abs($x) + abs($y);
# print "manhattan distance: $manhattan_dist\n";
# my $next_xy_n = $path->xy_to_n($x+1, $y);
# print "Next x,y: $next_xy_n";
## Answer can be found here: https://oeis.org/A141481/b141481.txt
## I just searched for the next highest value after $input_val
