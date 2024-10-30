document.addEventListener('DOMContentLoaded', () => {
	const app = document.getElementById('app');

	// Templates for login and register modals changement
	const loginModalTemplate = `
		<div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" data-translate="login" id="loginModalLabel">Login</h5>
					</div>
					<div class="modal-body">
						<form id="loginForm">
							<div class="mb-3">
								<label data-translate="email" for="email" class="form-label">Email Address</label>
								<input type="email" class="form-control" id="email" required>
							</div>
							<div class="mb-3">
								<label data-translate="password" for="password" class="form-label">Password</label>
								<input type="password" class="form-control" id="password" required>
							</div>
							<button data-translate="login" type="submit" class="btn btn-primary">Login</button>
							<button type="button" class="btn btn-secondary" id="login42Button">
								<img src="logo 42" style="height: 20px; width: 20px;">
								login
							</button>
						</form>
						<p class="mt-3" id="noAccountText">
							<span data-translate="noAccountText">No account?</span>
							<a href="#" id="showRegister" data-translate="createOneText">Create one</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	`;

	const registerModalTemplate = `
		<div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" data-translate="register" id="registerModalLabel">Register</h5>
					</div>
					<div class="modal-body">
						<form id="registerForm">
							<div class="form-group">
								<label data-translate="firstname" for="firstName">First Name</label>
								<input type="text" class="form-control" id="firstName" required>
							</div>
							<div class="form-group">
								<label data-translate="lastname" for="lastName">Last Name</label>
								<input type="text" class="form-control" id="lastName" required>
							</div>
							<div class="form-group">
								<label data-translate="username" for="userName">User Name</label>
								<input type="text" class="form-control" id="userName" required>
							</div>
							<div class="form-group">
								<label data-translate="email" for="registerEmail">Email Address</label>
								<input type="email" class="form-control" id="registerEmail" required>
							</div>
							<div class="form-group">
								<label data-translate="password" for="formerPassword">Password</label>
								<input type="password" class="form-control" id="formerPassword" required>
							</div>
							<div class="form-group">
								<label data-translate="confirmpass" for="confirmPassword2">Confirm Password</label>
								<input type="password" class="form-control" id="confirmPassword2" required>
							</div>
							<button data-translate="register" type="submit" class="btn btn-primary">Register</button>
							<button type="button" class="btn btn-secondary" id="register42Button">
								<h1 data-translate="registerwith">Register with</div>
								<img src="logo 42" style="height: 20px; width: 20px;">
							</button>
						</form>
						<p data-translate="already" class="mt-3">Already have an account?<a data-translate="login" href="#" id="showLogin">Login</a></p>
					</div>
				</div>
			</div>
		</div>
	`;

	const profileModalTemplate = `
		<div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" data-translate="editp" id="profileModalLabel">Edit Profile</h5>
						<button type="button" class="btn-close" id="closeProfileModal" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form id="editProfileForm">
							<div class="form-group">
								<label data-translate="firstname" for="editFirstName">First Name</label>
								<input type="text" class="form-control" id="editFirstName" required>
							</div>
							<div class="form-group">
								<label data-translate="lastname" for="editLastName">Last Name</label>
								<input type="text" class="form-control" id="editLastName" required>
							</div>
							<div class="form-group">
								<label data-translate="username" for="editUserName">User Name</label>
								<input type="text" class="form-control" id="editUserName" required>
							</div>
							<div class="form-group">
								<label data-translate="email" for="editEmail">Email Address</label>
								<input type="email" class="form-control" id="editEmail" required>
							</div>
							<button data-translate="save" type="submit" class="btn btn-primary">Save Changes</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	`;

	const passwordModalTemplate = `
		<div class="modal fade" id="changePasswordModal" tabindex="-1" aria-labelledby="changePasswordModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" data-translate="changepass" id="changePasswordModalLabel">Change Password</h5>
						<button type="button" class="btn-close" id ="closePasswordModal" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form id="changePasswordForm">
							<div class="mb-3">
								<label for="currentPassword" data-translate="currentpass" class="form-label">Current Password</label>
								<input type="password" class="form-control" id="currentPassword" required>
							</div>
							<div class="mb-3">
								<label for="newPassword" data-translate="newpass" class="form-label">New Password</label>
								<input type="password" class="form-control" id="newPassword" required>
							</div>
							<div class="mb-3">
								<label for="confirmPassword" data-translate="confirmpass" class="form-label">Confirm Password</label>
								<input type="password" class="form-control" id="confirmPassword" required>
							</div>
							<button type="submit" data-translate="changepass" class="btn btn-primary">Change Password</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	`;

	const multiTemplate = `
	<div id="multiSection" style="display:none;">
		<form id="multiOptions">
			<div class="mb-3">
				<label id="barM" data-translate="selectbar" for="barSizeM" class="form-label">Select a bar size:</label>
				<select id="barSizeM" class="form-select">
					<option id="smallM" data-translate="small" value="small">Small</option>
					<option id ="mediumM" data-translate="medium" value="medium">Medium</option>
					<option id="bigM" data-translate="big" value="big">Big</option>
				</select>
			</div>
			<div class="mb-3">
				<label id="pointsM" data-translate="pointstowin" for="gamePointsM" class="form-label">Points to win:</label>
				<select id="gamePointsM" class="form-select">
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
				</select>
			</div>
			<div class="mb-3">
				<label id="ballM" data-translate="selectball" for="ballSizeM" class="form-label">Select a ball size:</label>
				<select id="ballSizeM" class="form-select">
					<option id="small2M" data-translate="small" value="small">Small</option>
					<option id="medium2M" data-translate="medium" value="medium">Medium</option>
					<option id="big2M" data-translate="big" value="big">Big</option>
				</select>
			</div>
			<div id="playerOne">
				<label id="p1" data-translate="p1" for="player1Name" class="form-label">Nickname for Player 1:</label>
				<input type="text" id="player1Name" class="form-control" placeholder="Enter nickname">
			</div>
			<div id="playerTwo">
				<label id="p2" data-translate="p2" for="player2Name" class="form-label">Nickname for Player 2:</label>
				<input type="text" id="player2Name" class="form-control" placeholder="Enter nickname">
			</div>
			<div id="playerThree">
				<label id="p3" data-translate="p3" for="player3Name" class="form-label">Nickname for Player 3:</label>
				<input type="text" id="player3Name" class="form-control" placeholder="Enter nickname">
			</div>
			<button data-translate="addplayer" type="button" id="addPlayer" class="btn btn-secondary">+ Add Player</button>
			<div id="playerFour" style="display:none;">
				<label id="p4" data-translate="p4" for="player4Name" class="form-label">Nickname for Player 4:</label>
				<input type="text" id="player4Name" class="form-control" placeholder="Enter nickname">
			</div>
			<button id="submitMulti" data-translate="submit" type="submit" class="btn btn-primary">Submit</button>
		</form>
	</div>
	
	`;
	const vsPlayerTemplate = `
		<div id="pongOptionsPSection" style="display:none;">
			<form id="pongOptionsP">
				<div id="secondPlayer">
					<label id="name" data-translate="p2" for="playerName" class="form-label">Nickname for Player 2:</label>
					<input type="text" id="playerName" class="form-control" placeholder="Enter nickname">
				</div>
				<div class="mb-3">
					<label id="barP" data-translate="selectbar" for="barSizeP" class="form-label">Select a bar size:</label>
					<select id="barSizeP" class="form-select">
						<option id="smallP" data-translate="small" value="small">Small</option>
						<option id ="mediumP" data-translate="medium" value="medium">Medium</option>
						<option id="bigP" data-translate="big" value="big">Big</option>
					</select>
				</div>
				<div class="mb-3">
					<label id="pointsP" data-translate="pointstowin" for="gamePoints" class="form-label">Points to win:</label>
					<select id="gamePointsP" class="form-select">
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
					</select>
				</div>
				<div class="mb-3">
					<label id="ballP" data-translate="selectball" for="ballSizeP" class="form-label">Select a ball size:</label>
					<select id="ballSizeP" class="form-select">
						<option id="small2P" data-translate="small" value="small">Small</option>
						<option id="medium2P" data-translate="medium" value="medium">Medium</option>
						<option id="big2P" data-translate="big" value="big">Big</option>
					</select>
				</div>
				<button id="submitP" data-translate="submit" type="submit" class="btn btn-primary">Submit</button>
			</form>
		</div>
	`;

	const vsBotTemplate = `
		<div id="pongOptionsBSection" style="display:none;">
			<form id="pongOptionsB">
				<div class="mb-3">
					<label id="bar" data-translate="selectbar" for="barSize" class="form-label">Select a bar size:</label>
					<select id="barSize" class="form-select">
						<option id="small" data-translate="small" value="small">Small</option>
						<option id ="medium" data-translate="medium" value="medium">Medium</option>
						<option id="big" data-translate="big" value="big">Big</option>
					</select>
				</div>
				<div class="mb-3">
					<label id="points" data-translate="pointstowin" for="gamePoints" class="form-label">Points to win:</label>
					<select id="gamePoints" class="form-select">
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
					</select>
				</div>
				<div class="mb-3">
					<label id="ball" data-translate="selectball" for="ballSize" class="form-label">Select a ball size:</label>
					<select id="ballSize" class="form-select">
						<option id="small2" data-translate="small" value="small">Small</option>
						<option id="medium2" data-translate="medium" value="medium">Medium</option>
						<option id="big2" data-translate="big" value="big">Big</option>
					</select>
				</div>
				<button id="submit" data-translate="submit" type="submit" class="btn btn-primary">Submit</button>
			</form>
		</div>
	`;

	const mainContentTemplate = `
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<div class="container-fluid">
				<a class="navbar-brand" href="#">Transcendence</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
					aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse justify-content-end" id="navbarNav">
					<ul class="navbar-nav ms-auto">
						<li class="nav-item">
							<a class="nav-link" data-translate="home" href="#" data-translate="home" id="navHome">Home</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-translate="profile" href="#" id="navProfile">Profile</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-translate="history" href="#" id="navHistory">History</a>
						</li>
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="languagePicker" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								<img src="images/flags/en.jpg">
							</a>
							<ul class="dropdown-menu dropdown-menu-end" aria-labelledby="languagePicker">
								<li>
									<a class="dropdown-item language-option" href="#" data-language="en">
										<img src="en.jpg">
									</a>
								</li>
								<li>
									<a class="dropdown-item language-option" href="#" data-language="fr">
										<img src="/backend/static/images/flags/fr.jpg">
									</a>
								</li>
								<li>
									<a class="dropdown-item language-option" href="#" data-language="es">
										<img src="images/flags/es.jpg">
									</a>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<button class="btn btn-outline-danger my-2 my-sm-0" data-translate="logout" id="logoutButton">Logout</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<div id="mainContent">
			<div id="homeSection">
				<div class="d-flex justify-content-center align-items-center vh-100">
					<div id="game-card" class="text-center bg-dark text-white">
						<div>
							<h6 id="pong-title" class="display-3">PONG</h>
							<div id="menu-options">
								<button id="vsPlayerButton" class="btn btn-outline-light m-2" data-translate="vsp">vs Player</button>
								<button id="vsBotButton" class="btn btn-outline-light m-2" data-translate="vsb">vs Bot</button>
								<button id="multiButton" class="btn btn-outline-light m-2">2v2</button>
								<button id="tournamentButton" class="btn btn-outline-light m-2" data-translate="tournament">Tournament</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="historySection" style="display:none;">
			</div>
			<div id="profileSection" style="display:none;">
				<h1>Profile</h1>
				<div class="col-md-4">
					<div class="profile-picture-container text-center mb-4">
						<img id="profilePicture" src="default-profile.png" alt="Profile Picture" class="rounded-circle" style="width: 150px; height: 150px;">
					</div>
					<div class="profile-info">
						<p><strong>Name:</strong> <span id="profileName" data-translate="pname"></span></p>
						<p><strong>Username:</strong> <span id="profileUserName" data-translate="pusername"></span></p>
						<p><strong>Email:</strong> <span id="profileEmail" data-translate="pmail"></span></p>
					</div>
					<button class="btn btn-secondary mt-3 w-100" id="editProfileButton" data-translate="editp">Edit Profile</button>
					<button class="btn btn-secondary mt-3 w-100" id="changePasswordButton" data-translate="changepass">Change Password</button>
					<button class="btn btn-danger mt-3 w-100" id="deleteAccountButton" data-translate="delacc">Delete Account</button>
					<button class="btn btn-warning mt-3 w-100" id="anonymizeUserButton" data-translate="anonymise">Anonymize Data</button>
				</div>
				<form id="uploadProfilePictureForm" class="mt-3" w-100>
					<div class="form-group mb-3">
						<label for="profilePictureInput" data-translate="uploadp" class="form-label">Upload Profile Picture</label>
						<input type="file" class="form-control" id="profilePictureInput" accept="image/*">
					</div>
					<button type="submit" data-translate="upload" class="btn btn-primary">Upload</button>
				</form>
			</div>
		</div>
	`;

	const playingTemplate = `
		<div id="playingSection" style="display:none;">
		</div>
	`;


	app.innerHTML = playingTemplate + loginModalTemplate + registerModalTemplate + profileModalTemplate + passwordModalTemplate + mainContentTemplate + vsBotTemplate + vsPlayerTemplate + multiTemplate; //  + gameOptionsModalTemplate;

	const loginModal = new bootstrap.Modal(document.getElementById('loginModal'), {
		backdrop: 'static',
		keyboard: false
	});

	const registerModal = new bootstrap.Modal(document.getElementById('registerModal'), {
		backdrop: 'static',
		keyboard: false
	});

	const profileModal = new bootstrap.Modal(document.getElementById('profileModal'), {
		backdrop: 'static',
		keyboard: true
	});

    const changePasswordModal = new bootstrap.Modal(document.getElementById('changePasswordModal'), {
        backdrop: 'static',
        keyboard: false
    });

	const mainContent = document.getElementById('mainContent');
	const optionsPlayerContent = document.getElementById('pongOptionsPSection');
	const optionsBotContent = document.getElementById('pongOptionsBSection');
	const optionsMultiContent = document.getElementById('multiSection');
	const showRegister = document.getElementById('showRegister');
	const loginForm = document.getElementById('loginForm');
	const showLogin = document.getElementById('showLogin');
	const registerForm = document.getElementById('registerForm');
	const navHome = document.getElementById('navHome');
	const navHistory = document.getElementById('navHistory');
	const navProfile = document.getElementById('navProfile');
	const logoutButton = document.getElementById('logoutButton');
	const profilePicture = document.getElementById('profilePicture');
	const profileName = document.getElementById('profileName');
	const profileUserName = document.getElementById('profileUserName');
	const profileEmail = document.getElementById('profileEmail');
	const uploadProfilePictureForm = document.getElementById('uploadProfilePictureForm');
	const editProfileButton = document.getElementById('editProfileButton');
	const editProfileForm = document.getElementById('editProfileForm');
	const changePasswordForm = document.getElementById('changePasswordForm');
	const changePasswordButton = document.getElementById('changePasswordButton');
	const profileCloseButton = document.getElementById('closeProfileModal');
	const closeButton = document.getElementById('closePasswordModal');
	const vsPlayerButton = document.getElementById('vsPlayerButton');
	const vsBotButton = document.getElementById('vsBotButton');

	loginModal.show();

	showRegister.addEventListener('click', (e) => {
		e.preventDefault();
		loginModal.hide();
		registerModal.show();
	});

	const multiButton = document.getElementById('multiButton');
    document.getElementById('addPlayer').addEventListener('click', function() {
        const playerFourDiv = document.getElementById('playerFour');
        playerFourDiv.style.display = 'block';
        this.style.display = 'none';
    });

	document.getElementById('multiOptions').addEventListener('submit', function(event) {
        event.preventDefault();
        saveOptionsM();
        optionsMultiContent.style.display = 'none';
		showSection('playing');
        launchGame();
    });

    multiButton.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('multi');
    });

	document.getElementById('pongOptionsB').addEventListener('submit', function(event) {
		event.preventDefault();
		saveOptionsB();
		const userData = JSON.parse(localStorage.getItem(profileEmail.textContent));
		sessionStorage.setItem('playerOneName', userData.userName);
		optionsBotContent.style.display = 'none';
		showSection('playing');
		launchGame();
	});

	document.getElementById('pongOptionsP').addEventListener('submit', function(event) {
		event.preventDefault();
		saveOptionsP();
		const userData = JSON.parse(localStorage.getItem(profileEmail.textContent));
		sessionStorage.setItem('playerOneName', userData.userName);
		optionsPlayerContent.style.display = 'none';
		showSection('playing');
		launchGame();
	});

	showLogin.addEventListener('click', (e) => {
		e.preventDefault();
		registerModal.hide();
		loginModal.show();
	});

	loginForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;
		if (validateUser(email, password)) {
			const userData = JSON.parse(localStorage.getItem(email));
			profileName.textContent = `${userData.firstName} ${userData.lastName}`;
			profileUserName.textContent = userData.userName;
			profileEmail.textContent = userData.email;
			loginModal.hide();
			mainContent.style.display = 'block';
			showSection('home');
		} else {
			alert('Invalid email address or password');
		}
	});

	registerForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const firstName = document.getElementById('firstName').value;
		const lastName = document.getElementById('lastName').value;
		const userName = document.getElementById('userName').value;
		const email = document.getElementById('registerEmail').value;
		const password = document.getElementById('formerPassword').value;
		const confirmPassword = document.getElementById('confirmPassword2').value;

		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}

		if (registerUser(firstName, lastName, userName, email, password)) {
			registerModal.hide();
			loginModal.show();
		} else {
			alert('Registration failed');
		}
	});

	uploadProfilePictureForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const fileInput = document.getElementById('profilePictureInput');
		if (fileInput.files && fileInput.files[0]) {
			const reader = new FileReader();
			reader.onload = function (e) {
				profilePicture.src = e.target.result;
				const userData = JSON.parse(localStorage.getItem(profileEmail.textContent));
				userData.profilePicture = e.target.result;
				localStorage.setItem(userData.email, JSON.stringify(userData));
			};
			reader.readAsDataURL(fileInput.files[0]);
		}
	});

	editProfileButton.addEventListener('click', () => {
		const userData = JSON.parse(localStorage.getItem(profileEmail.textContent));
		document.getElementById('editFirstName').value = userData.firstName;
		document.getElementById('editLastName').value = userData.lastName;
		document.getElementById('editUserName').value = userData.userName;
		document.getElementById('editEmail').value = userData.email;
		profileModal.show();
	});

	vsPlayerButton.addEventListener('click', (e) => {
		e.preventDefault();
		showSection('pongOptionsP');
	});

	vsBotButton.addEventListener('click', (e) => {
		e.preventDefault();
		showSection('pongOptionsB');
	});

	editProfileForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const firstName = document.getElementById('editFirstName').value;
		const lastName = document.getElementById('editLastName').value;
		const userName = document.getElementById('editUserName').value;
		const email = document.getElementById('editEmail').value;
		const userData = JSON.parse(localStorage.getItem(profileEmail.textContent));
		userData.firstName = firstName;
		userData.lastName = lastName;
		userData.userName = userName;
		userData.email = email;
		localStorage.setItem(email, JSON.stringify(userData));
		profileName.textContent = `${firstName} ${lastName}`;
		profileUserName.textContent = userName;
		profileEmail.textContent = email;
		profileModal.hide();
	});

	const login42Button = document.getElementById('login42Button');
	login42Button.addEventListener('click', () => {
		const clientId = 'YOUR_CLIENT_ID';
		const redirectUri = 'YOUR_REDIRECT_URI';
		const scope = 'public';
		const state = 'some_random_state';
		const authUrl = `https://api.intra.42.fr/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}`;

		window.location.href = authUrl;
	});

	const register42Button = document.getElementById('register42Button')
	register42Button.addEventListener('click', () => {
		const clientId = 'YOUR_CLIENT_ID';
		const redirectUri = 'YOUR_REDIRECT_URI';
		const scope = 'public';
		const state = 'some_random_state';
		const authUrl = `https://api.intra.42.fr/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}`;

		window.location.href = authUrl;
	});

	navHome.addEventListener('click', (e) => {
		e.preventDefault();
		showSection('home');
	});
	navHistory.addEventListener('click', (e) => {
		e.preventDefault();
		showSection('history');
		loadScript('history.js');
	});
	navProfile.addEventListener('click', (e) => {
		e.preventDefault();
		showSection('profile');
	});

	logoutButton.addEventListener('click', () => {
		logoutUser();
		loginModal.show();
		mainContent.style.display = 'none';
	});

	changePasswordButton.addEventListener('click', () => {
		changePasswordModal.show();
	});

	closeButton.addEventListener('click', () => {
		changePasswordModal.hide();
	});

	profileCloseButton.addEventListener('click', () => {
		profileModal.hide();
	});

	changePasswordForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const newPassword = document.getElementById('newPassword').value;
		const confirmPassword = document.getElementById('confirmPassword').value;

		if (newPassword !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}
		changePasswordModal.hide();
	});

    window.addEventListener('popstate', (event) => {
        const section = event.state?.section || 'home';
		if (section == 'pongOptionsB' || section == 'pongOptionsP' || section == 'multi')
			game.windowChange = true;
        showSection(section, false);
    });

    function showSection(section, addToHistory = true) {
        const sections = ['home', 'history', 'profile', 'pongOptionsB', 'pongOptionsP', 'multi', 'playing'];
        sections.forEach(sec => {
            const sectionElement = document.getElementById(sec + 'Section');
            if (sectionElement) {
                if (sec === section) {
                    sectionElement.style.display = 'block';
                } else {
                    sectionElement.style.display = 'none';
                }
            }
        });

        if (addToHistory) {
            history.pushState({ section: section }, null, `#${section}`);
        }
    }

    const initialSection = window.location.hash.substr(1);
    showSection(initialSection || 'home', false);

	function validateUser(email, password) {
		const userDataString = localStorage.getItem(email);

		if (!userDataString) {
			return false;
		}

		const userData = JSON.parse(userDataString);
		return userData.password === password;
	}

	function registerUser(firstName, lastName, userName, email, password) {
		const userExists = localStorage.getItem(email);
		if (userExists) {
			return false;
		}
		localStorage.setItem(email, JSON.stringify({ firstName, lastName, userName, email, password }));
		return true;
	}


	function logoutUser() {

	}

	const translations = {
		en: {
			noAccountText: "No account?",
			createOneText: "Create one",
			email: "Email Address",
			password: "Password",
			login: "Login",
			home: "Home",
			firstname: "First Name",
			lastname: "Last Name",
			username: "User Name",
			registerwith: "Register with",
			already: "Already have an account?",
			editp: "Edit Profile",
			save: "Save Changes",
			changepass: "Change Password",
			currentpass: "Current Password",
			newpass: "New Password",
			confirmpass: "Confirm Password",
			selectbar: "Select a bar size:",
			small: "Small",
			medium: "Medium",
			big: "Big",
			pointstowin: "Points to win:",
			selectball: "Select a ball size:",
			p1: "Nickname for Player 1:",
			p2: "Nickname for Player 2:",
			p3: "Nickname for Player 3:",
			p4: "Nickname for Player 4:",
			addplayer: "+ Add Player",
			submit: "Submit",
			profile: "Profile",
			history: "History",
			logout: "Logout",
			vsp: "vs Player",
			vsb: "vs Bot",
			tournament: "Tournament",
			pname: "Name:",
			pusername: "Username:",
			pmail: "Email:",
			delacc: "Delete Account",
			anonymise: "Anonymise Data",
			uploadp: "Upload Profile Picture",
			upload: "Upload"
		},
		fr: {
			noAccountText: "Pas de compte ?",
			createOneText: "Créer un compte",
			email: "Adresse e-mail",
			password: "Mot de passe",
			login: "Connexion",
			home: "Accueil",
			firstname: "Prénom",
			lastname: "Nom",
			username: "Nom d'utilisateur",
			registerwith: "S'inscrire avec",
			already: "Vous avez déjà un compte ?",
			editp: "Éditer le profil",
			save: "Enregistrer les modifications",
			changepass: "Changer le mot de passe",
			currentpass: "Mot de passe actuel",
			newpass: "Nouveau mot de passe",
			confirmpass: "Confirmer le mot de passe",
			selectbar: "Sélectionnez une taille de barre :",
			small: "Petit",
			medium: "Moyen",
			big: "Grand",
			pointstowin: "Points pour gagner :",
			selectball: "Sélectionnez une taille de balle :",
			p1: "Surnom pour le Joueur 1 :",
			p2: "Surnom pour le Joueur 2 :",
			p3: "Surnom pour le Joueur 3 :",
			p4: "Surnom pour le Joueur 4 :",
			addplayer: "+ Ajouter un joueur",
			submit: "Soumettre",
			profile: "Profil",
			history: "Historique",
			logout: "Déconnexion",
			vsp: "vs Joueur",
			vsb: "vs Bot",
			tournament: "Tournoi",
			pname: "Nom :",
			pusername: "Nom d'utilisateur :",
			pmail: "E-mail :",
			delacc: "Supprimer le compte",
			anonymise: "Anonymiser les données",
			uploadp: "Télécharger la photo de profil",
			upload: "Télécharger"
		}
		,
		es: {
			noAccountText: "¿No tienes cuenta?",
			createOneText: "Crear una",
			email: "Dirección de correo",
			password: "Contraseña",
			login: "Iniciar sesión",
			home: "Inicio",
			firstname: "Nombre",
			lastname: "Apellido",
			username: "Nombre de usuario",
			registerwith: "Registrarse con",
			already: "¿Ya tienes una cuenta?",
			editp: "Editar perfil",
			save: "Guardar cambios",
			changepass: "Cambiar contraseña",
			currentpass: "Contraseña actual",
			newpass: "Nueva contraseña",
			confirmpass: "Confirmar contraseña",
			selectbar: "Selecciona un tamaño de barra:",
			small: "Pequeño",
			medium: "Medio",
			big: "Grande",
			pointstowin: "Puntos para ganar:",
			selectball: "Selecciona un tamaño de pelota:",
			p1: "Apodo para el Jugador 1:",
			p2: "Apodo para el Jugador 2:",
			p3: "Apodo para el Jugador 3:",
			p4: "Apodo para el Jugador 4:",
			addplayer: "+ Agregar jugador",
			submit: "Enviar",
			profile: "Perfil",
			history: "Historial",
			logout: "Cerrar sesión",
			vsp: "vs Jugador",
			vsb: "vs Bot",
			tournament: "Torneo",
			pname: "Nombre:",
			pusername: "Nombre de usuario:",
			pmail: "Correo:",
			delacc: "Eliminar cuenta",
			anonymise: "Anonimizar datos",
			uploadp: "Subir foto de perfil",
			upload: "Subir"
		}		
	};

	function updateLanguage(language) {
		document.querySelectorAll('[data-translate]').forEach(element => {
			const key = element.getAttribute('data-translate');
			element.textContent = translations[language][key];
		});
	}

	document.querySelectorAll('.language-option').forEach(option => {
		option.addEventListener('click', (e) => {
			e.preventDefault();
			const language = option.getAttribute('data-language');
			updateLanguage(language);
			document.getElementById('languagePicker').innerHTML = option.innerHTML;
		});
	});

	updateLanguage('en');
    // const backToHomeButton = document.getElementById('backToHome');

    
    // backToHomeButton.addEventListener('click', (e) => {
	// 	e.preventDefault();
    //     showSection('home');
    // });

	
});