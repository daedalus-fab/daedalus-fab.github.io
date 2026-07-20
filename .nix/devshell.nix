{ pkgs }:
pkgs.mkShell {
  packages = with pkgs; [
    nodejs_22
    git
  ] ++ pkgs.lib.optionals pkgs.stdenv.isDarwin [ pkgs.libiconv ];
}
