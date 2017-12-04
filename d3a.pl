use strict;
use Math::PlanePath::SquareSpiral;

my $path = Math::PlanePath::SquareSpiral->new;
my $input_val = 277678;
my ($x, $y) = $path->n_to_xy($input_val);
my $manhattan_dist = abs($x) + abs($y);
print "$manhattan_dist";
