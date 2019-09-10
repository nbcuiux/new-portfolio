To run in dev mode run

	npm install -g babel-cli 	<-- If you don't have babel cli

	gulp

Then load localhost:8000 in a browser

Wordpress
http://portfolio-wp.nbcuxlab.com/wordpress/wp-admin/


Note. 
If the error pops up:
npm ERR! git clone --template=/Users/USERNAME/.npm/_git-remotes/_templates --mirror https://github.com/nbc-ux/wp-react.git /Users/USERNAME/.npm/_git-remotes/git-https-github-com-nbc-ux-wp-react-git-9cddcd49: Cloning into bare repository '/Users/USERNAME/.npm/_git-remotes/git-https-github-com-nbc-ux-wp-react-git-9cddcd49'...
* USERNAME - your COMPUTER username

Run:
npm install --save git+https://USERNAME:PASSWORD@github.com/nbc-ux/wp-react.git;
npm install
* USERNAME - your git username
PASSWORD - your git password