document.addEventListener('DOMContentLoaded', () => {
	const app = document.getElementById('app');

	const loginModalTemplate = `
		<div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
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
							<div class="d-flex justify-content-between">
                                <button data-translate="login" type="submit" class="btn btn-primary w-100 me-1">Login</button>
                                <button type="button" class="btn btn-secondary bg-dark text-white w-100 ms-1" id="login42Button">
                                    login with
                                    <img src="/static/images/assets/42logo.png" style="height: 20px; width: 20px;">
                                </button>
                            </div>
						</form>
						<p class="mt-3">
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
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" data-translate="register" id="registerModalLabel">Register</h5>
					</div>
					<div class="modal-body">
                    	<form id="registerForm">
                        	<div class="mb-3 form-group">
                        	      <input data-translate="firstname" type="text" class="form-control" id="firstName" placeholder="First Name" required>
                        	</div>
                        	<div class="mb-3 form-group">
                        	    <input data-translate="lastname" type="text" class="form-control" id="lastName" placeholder="Last Name" required>
                        	</div>
                        	<div class="mb-3 form-group">
                        	    <input data-translate="username" type="text" class="form-control" id="userName" placeholder="User Name" required>
                        	</div>
                        	<div class="mb-3 form-group">
                        	    <input data-translate="email" type="email" class="form-control" id="registerEmail" placeholder="Email Address" required>
                        	</div>
                        	<div class="mb-3 form-group">
                        	    <input data-translate="pass" type="password" class="form-control" id="formerPassword" placeholder="Password" required>
                        	</div>
                        	<div class="mb-3 form-group">
                        	    <input data-translate="confirmpass" type="password" class="form-control" id="confirmPassword2" placeholder="Confirm Password" required>
                        	</div>
							<div class="d-flex justify-content-between">
                        		<button data-translate="register" type="submit" class="btn btn-primary me-1 w-100">Register</button>
                    		</div>
						</form>
						<p class="mt-3">
							<span data-translate="already" class="mt-3 w-100">Already have an account?</span>
							<a href="#" id="showLogin" data-translate="login">Login</a>
						</p>
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
							<button data-translate="save" type="submit" class="btn btn-primary">Save Changes</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	`;

	const multiTemplate = `
	<div id="multiSection" style="display:none;">
		<form id="multiOptions">
			<div class="mb-3 form-group">
				<label id="barM" data-translate="selectbar" for="barSizeM" class="form-label">Select a bar size:</label>
				<select id="barSizeM" class="form-select">
					<option id="smallM" data-translate="small" value="small">Small</option>
					<option id ="mediumM" data-translate="medium" value="medium">Medium</option>
					<option id="bigM" data-translate="big" value="big">Big</option>
				</select>
			</div>
			<div class="mb-3 form-group">
				<label id="pointsM" data-translate="pointstowin" for="gamePointsM" class="form-label">Points to win:</label>
				<select id="gamePointsM" class="form-select">
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
				</select>
			</div>
			<div class="mb-3 form-group">
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
			<div class="d-flex justify-content-between mt-3">
                <button data-translate="submit" type="submit" class="btn btn-primary">Submit</button>
                <button id="backToHomeM" class="backToHomeButton btn btn-secondary bg-dark text-white" data-translate="back">Back</button>
            </div>
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
				<div class="mb-3 form-group">
					<label id="barP" data-translate="selectbar" for="barSizeP" class="form-label">Select a bar size:</label>
					<select id="barSizeP" class="form-select">
						<option id="smallP" data-translate="small" value="small">Small</option>
						<option id ="mediumP" data-translate="medium" value="medium">Medium</option>
						<option id="bigP" data-translate="big" value="big">Big</option>
					</select>
				</div>
				<div class="mb-3 form-group">
					<label id="pointsP" data-translate="pointstowin" for="gamePoints" class="form-label">Points to win:</label>
					<select id="gamePointsP" class="form-select">
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
					</select>
				</div>
				<div class="mb-3 form-group">
					<label id="ballP" data-translate="selectball" for="ballSizeP" class="form-label">Select a ball size:</label>
					<select id="ballSizeP" class="form-select">
						<option id="small2P" data-translate="small" value="small">Small</option>
						<option id="medium2P" data-translate="medium" value="medium">Medium</option>
						<option id="big2P" data-translate="big" value="big">Big</option>
					</select>
				</div>
				<div class="d-flex justify-content-between mt-3">
                    <button data-translate="submit" type="submit" class="btn btn-primary">Submit</button>
                    <button id="backToHomeP" data-translate="back" class="backToHomeButton btn btn-secondary bg-dark text-white">Back</button>
                </div>
			</form>
		</div>
	`;

	const vsBotTemplate = `
		<div id="pongOptionsBSection" style="display:none;">
			<form id="pongOptionsB">
				<div class="mb-3 form-group">
					<label id="bar" data-translate="selectbar" for="barSize" class="form-label">Select a bar size:</label>
					<select id="barSize" class="form-select">
						<option id="small" data-translate="small" value="small">Small</option>
						<option id ="medium" data-translate="medium" value="medium">Medium</option>
						<option id="big" data-translate="big" value="big">Big</option>
					</select>
				</div>
				<div class="mb-3 form-group">
					<label id="points" data-translate="pointstowin" for="gamePoints" class="form-label">Points to win:</label>
					<select id="gamePoints" class="form-select">
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
					</select>
				</div>
				<div class="mb-3 form-group">
					<label id="ball" data-translate="selectball" for="ballSize" class="form-label">Select a ball size:</label>
					<select id="ballSize" class="form-select">
						<option id="small2" data-translate="small" value="small">Small</option>
						<option id="medium2" data-translate="medium" value="medium">Medium</option>
						<option id="big2" data-translate="big" value="big">Big</option>
					</select>
				</div>
				<div class="d-flex justify-content-between mt-3">
                    <button data-translate="submit" id="submit" type="submit" class="btn btn-primary">Submit</button>
                    <button data-translate="back" id="backToHomeB" class="backToHomeButton btn btn-secondary bg-dark text-white">Back</button>
                </div>
			</form>
		</div>
	`;

	const mainContentTemplate = `
		<nav class="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-center">
            <div class="container-fluid justify-content-between">
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
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="languagePicker" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								<img src="/static/images/flags/en.jpg" alt="English" style="width: 20px; height: 20px;">
							</a>
							<ul class="dropdown-menu dropdown-menu-end" aria-labelledby="languagePicker">
								<li>
									<a class="dropdown-item language-option" href="#" data-language="en">
										<img src="/static/images/flags/en.jpg" alt="English" style="width: 20px; height: 20px;">
									</a>
								</li>
								<li>
									<a class="dropdown-item language-option" href="#" data-language="fr">
										<img src="/static/images/flags/fr.jpg" alt="French" style="width: 20px; height: 20px;">
									</a>
								</li>
								<li>
									<a class="dropdown-item language-option" href="#" data-language="es">
										<img src="/static/images/flags/es.jpg" alt="Spanish" style="width: 20px; height: 20px;">
									</a>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<button data-translate="logout" class="btn btn-outline-danger my-2 mx-2 my-sm-0" style="width: 100px" id="logoutButton">Logout</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<div id="mainContent">
			<div id="homeSection">
				<div class="d-flex justify-content-center align-items-center" style="height: 90vh;">
					<div id="game-card" class="text-center bg-dark text-white">
						<div>
							<h6 id="pong-title" class="display-2 mb-4">PONG</h6>
							<div id="menu-options">
								<button id="vsPlayerButton" class="btn btn-secondary mt-2 w-100" data-translate="vsp">vs Player</button>
								<button id="vsBotButton" class="btn btn-secondary mt-2 w-100" data-translate="vsb">vs Bot</button>
								<button id="multiButton" class="btn btn-secondary mt-2 w-100">2v2</button>
								<button id="tournamentButton" class="btn btn-secondary mt-2 w-100" data-translate="tournament">Tournament</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="profileSection" style="display:none;">
				<h1>Profile</h1>
				<div class="col-md-4">
					<div class="profile-picture-container text-center mb-4">
						<img id="profilePicture" src="/static/images/assets/default-avatar.png" alt="Profile Picture" class="rounded-circle" style="width: 150px; height: 150px;">
					</div>
					<div class="profile-info">
						<p><strong data-translate="fname">Name:</strong> <span id="profileFirst"></span></p>
						<p><strong data-translate="lname">Name:</strong> <span id="profileLast"></span></p>
						<p><strong data-translate="pusername">Username:</strong> <span id="profileUserName"></span></p>
						<p><strong data-translate="pmail">Email:</strong> <span id="profileEmail"></span></p>
					</div>
					<button class="btn btn-secondary mt-3 w-100" id="editProfileButton" data-translate="editp">Edit Profile</button>
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

	const tournamentTemplate = `
		<div id="tournamentSection" style="display:none;">
			<div class="mb-3 form-group">
				<form id="tournamentOptions">
					<div>
						<label id="p1" data-translate="p1" for="player1" class="form-label">Nickname for Player 1:</label>
						<input type="text" id="player1" class="form-control" placeholder="Enter nickname">
					</div>
					<div>
						<label id="p2" data-translate="p2" for="player2" class="form-label">Nickname for Player 2:</label>
						<input type="text" id="player2" class="form-control" placeholder="Enter nickname">
					</div>
					<div>
						<label id="p3" data-translate="p3" for="player3" class="form-label">Nickname for Player 3:</label>
						<input type="text" id="player3" class="form-control" placeholder="Enter nickname">
					</div>
					<div>
						<label id="p4" data-translate="p4" for="player4" class="form-label">Nickname for Player 4:</label>
						<input type="text" id="player4" class="form-control" placeholder="Enter nickname">
					</div>
					<div>
						<label id="p5" data-translate="p5" for="player5" class="form-label">Nickname for Player 5:</label>
						<input type="text" id="player5" class="form-control" placeholder="Enter nickname">
					</div>
					<div>
						<label id="p6" data-translate="p6" for="player6" class="form-label">Nickname for Player 6:</label>
						<input type="text" id="player6" class="form-control" placeholder="Enter nickname">
					</div>
					<div>
						<label id="p7" data-translate="p7" for="player7" class="form-label">Nickname for Player 7:</label>
						<input type="text" id="player7" class="form-control" placeholder="Enter nickname">
					</div>
					<div>
						<label id="p8" data-translate="p8" for="player8" class="form-label">Nickname for Player 8:</label>
						<input type="text" id="player8" class="form-control" placeholder="Enter nickname">
					</div>
					<div class="d-flex justify-content-between mt-3">
						<button data-translate="submit" type="submit" class="btn btn-primary">Submit</button>
						<button id="backToHomeT" class="backToHomeButton btn btn-secondary bg-dark text-white" data-translate="back">Back</button>
					</div>
				</form>
			</div>
		</div>
	`;

	app.innerHTML = tournamentTemplate + playingTemplate + loginModalTemplate + registerModalTemplate + profileModalTemplate + mainContentTemplate + vsBotTemplate + vsPlayerTemplate + multiTemplate; //  + gameOptionsModalTemplate;

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

	const navbarToggle = document.querySelector('.navbar-toggler');
	const mainContent = document.getElementById('mainContent');
	const optionsPlayerContent = document.getElementById('pongOptionsPSection');
	const optionsBotContent = document.getElementById('pongOptionsBSection');
	const tournamentContent = document.getElementById('tournamentSection');
	const optionsMultiContent = document.getElementById('multiSection');
	const showRegister = document.getElementById('showRegister');
	const loginForm = document.getElementById('loginForm');
	const showLogin = document.getElementById('showLogin');
	const registerForm = document.getElementById('registerForm');
	const navHome = document.getElementById('navHome');
	const navProfile = document.getElementById('navProfile');
	const logoutButton = document.getElementById('logoutButton');
	const profilePicture = document.getElementById('profilePicture');
	const profileLast = document.getElementById('profileLast');
	const profileFirst = document.getElementById('profileFirst');
	const profileUserName = document.getElementById('profileUserName');
	const profileEmail = document.getElementById('profileEmail');
	const uploadProfilePictureForm = document.getElementById('uploadProfilePictureForm');
	const editProfileButton = document.getElementById('editProfileButton');
	// const anonymizeUserButton = document.getElementById('anonymizeUserButton');
	const editProfileForm = document.getElementById('editProfileForm');
	const profileCloseButton = document.getElementById('closeProfileModal');
	const vsPlayerButton = document.getElementById('vsPlayerButton');
	const vsBotButton = document.getElementById('vsBotButton');
	const tournamentButton = document.getElementById('tournamentButton');

	function collapseNavbar() {
		const navbar = document.getElementById('navbarNav');
		if (navbar.classList.contains('show')) {
			navbarToggle.click();
		}
	}

    const urlParams = new URLSearchParams(window.location.search);
    const from42 = urlParams.get('from');

    if (from42 !== '42') {
        loginModal.show();
    }
	if (from42 == '42')
		getget();

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

	document.getElementById('anonymizeUserButton').addEventListener('click', async (e) => {
		e.preventDefault();
		const userData6 = {
			firstname: "xxx",
			username: "xxx",
			lastname: "xxx",
			email: sessionStorage.getItem('email'),
		}

		profileFirst.textContent = 'xxx';
		profileLast.textContent = 'xxx';
		profileUserName.textContent = 'xxx';
		await anonymiseUser(userData6);
	})

	document.getElementById('deleteAccountButton').addEventListener('click', async (e) => {
		e.preventDefault();
		const userData5 = {
			email: sessionStorage.getItem('email'),
			firstname: sessionStorage.getItem('firstname'),
			lastname: sessionStorage.getItem('lastname'),
			username: sessionStorage.getItem('username')
		};
		// const deleteResult = await deleteAccount(userData5);
		const deleteResult = await deleteAccount(userData5);
		if (deleteResult){
			showSection('home');
			loginModal.show();
		}
	});

    multiButton.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('multi');
    });

	document.getElementById('pongOptionsB').addEventListener('submit', async function(event) {
		event.preventDefault();
		saveOptionsB();
		sessionStorage.setItem('playerOneName', sessionStorage.getItem('username'));
		optionsBotContent.style.display = 'none';
		showSection('playing');
		launchGame();
	});

	document.getElementById('tournamentOptions').addEventListener('submit', function(event) {
		event.preventDefault();
		tournamentContent.style.display = 'none';
		showSection('playing');
		handleTournament();
	});

	document.getElementById('pongOptionsP').addEventListener('submit', function(event) {
		event.preventDefault();
		saveOptionsP();
		sessionStorage.setItem('playerOneName', sessionStorage.getItem('username'));
		optionsPlayerContent.style.display = 'none';
		showSection('playing');
		launchGame();
	});

	showLogin.addEventListener('click', (e) => {
		e.preventDefault();
		registerModal.hide();
		loginModal.show();
	});

	loginForm.addEventListener('submit', async (e) => {
		e.preventDefault();
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;
		const userData3 = {
			email: email,
			password: password,
		};
		const loginResult = await loginUserDB(userData3);
		if (loginResult) {
			const user = loginResult.user;
			profileFirst.textContent = user.firstname;
			profileLast.textContent = user.lastname;
			profileUserName.textContent = user.username;
			profileEmail.textContent = user.email;		
			registerModal.hide();
			loginModal.hide();
			mainContent.style.display = 'block';
			showSection('home');
		} else {
			alert('Échec de la connexion, veuillez réessayer.');
		}
		
	});
	
	registerForm.addEventListener('submit', async (e) => {
		e.preventDefault();
		const password = document.getElementById('formerPassword').value;
		const confirmPassword = document.getElementById('confirmPassword2').value;

		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}
				
		const firstName = document.getElementById('firstName').value;
		const lastName = document.getElementById('lastName').value;
		const userName = document.getElementById('userName').value;
		const email = document.getElementById('registerEmail').value;
		sessionStorage.setItem(email, JSON.stringify({ firstName, lastName, userName, email }));
		const userData2 = {
			firstname: firstName,
			lastname: lastName,
			username: userName,
			email: email,
			password: password,
		};
		const registrationResult = await registerUserDB(userData2);
		if (registrationResult) {
			registerModal.hide();
			loginModal.show();
		} else {
			alert('Inscription failed noob');
		}
	});

	uploadProfilePictureForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const fileInput = document.getElementById('profilePictureInput');
		if (fileInput.files && fileInput.files[0]) {
			const reader = new FileReader();
			reader.onload = function (e) {
				profilePicture.src = e.target.result;
				const userData = JSON.parse(sessionStorage.getItem(profileEmail.textContent));
				userData.profilePicture = e.target.result;
				sessionStorage.setItem(userData.email, JSON.stringify(userData));
			};
			reader.readAsDataURL(fileInput.files[0]);
		}
	});

	editProfileButton.addEventListener('click', () => {
		const firstname = sessionStorage.getItem('firstname');
		const lastname = sessionStorage.getItem('lastname');
		const username = sessionStorage.getItem('username');
		document.getElementById('editFirstName').value = firstname;
		document.getElementById('editLastName').value = lastname;
		document.getElementById('editUserName').value = username;
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

	tournamentButton.addEventListener('click', (e) => {
		e.preventDefault();
		showSection('tournament');
	});

	editProfileForm.addEventListener('submit', async (e) => {
		e.preventDefault();
		
		const firstName = document.getElementById('editFirstName').value;
		const lastName = document.getElementById('editLastName').value;
		const userName = document.getElementById('editUserName').value;

		profileFirst.textContent = firstName;
		profileLast.textContent = lastName;
		profileUserName.textContent = userName;
		sessionStorage.setItem('username', userName);
		sessionStorage.setItem('lastname', lastName);
		sessionStorage.setItem('firstname', firstName);
		// sessionStorage.setItem(email, JSON.stringify({ firstName, lastName, userName, email }));
		const userData4 = {
			firstname: firstName,
			lastname: lastName,
			username: userName,
			email: sessionStorage.getItem('email')
		};
		const editResult = await editUserDB(userData4);
		if (editResult)
			profileModal.hide();
		else
			alert("a malibu");
	});

	const login42Button = document.getElementById('login42Button');
	
	login42Button.addEventListener('click', (e) => {
		e.preventDefault();
		window.location.href = "/api/oauth/redirect";
		
	});

	function getCoookie(name) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(';').shift();
	}
	
	// // Récupérer les cookies de l'utilisateur
	// const userEmail = getCoookie('user_email');
	// const userLastName = getCoookie('user_lastname');
	// const userFirstName = getCoookie('user_firstname');
	// const userUsername = getCoookie('user_username');

	// sessionStorage.setItem('username', userName);
	// sessionStorage.setItem('lastname', lastName);
	// sessionStorage.setItem('firstname', firstName);

	async function getget(){
		const getgetResult = await getUserDB();
		// sessionStorage.setItem('email', getCoookie('user_email'))
		// sessionStorage.setItem('username', getCoookie('user_username'))
		// sessionStorage.setItem('firstname', getCoookie('user_firstname'))
		// sessionStorage.setItem('lastname', getCoookie('user_lastname'))
		if (getgetResult){
			profileFirst.textContent = getgetResult.firstname;
			profileLast.textContent = getgetResult.lastname;
			profileUserName.textContent = getgetResult.username;
			profileEmail.textContent = getgetResult.email;
			sessionStorage.setItem('email', getgetResult.email);
			sessionStorage.setItem('username', getgetResult.username);
			sessionStorage.setItem('firstname', getgetResult.firstname);
			sessionStorage.setItem('lastname', getgetResult.lastname);
		}
		// console.log("tetetetetetetetetetetetetetetetetetetete " + getCoookie('user_email'));
	}


	// const register42Button = document.getElementById('register42Button')
	// register42Button.addEventListener('click', () => {
	// 	const clientId = 'YOUR_CLIENT_ID';
	// 	const redirectUri = 'YOUR_REDIRECT_URI';
	// 	const scope = 'public';
	// 	const state = 'some_random_state';
	// 	const authUrl = `https://api.intra.42.fr/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}`;

	// 	window.location.href = authUrl;
	// });

	navHome.addEventListener('click', (e) => {
		e.preventDefault();
		showSection('home');
		collapseNavbar();
	});

	navProfile.addEventListener('click', (e) => {
		e.preventDefault();
		showSection('profile');
		collapseNavbar();
	});

	logoutButton.addEventListener('click', () => {
		logoutUser();
		loginModal.show();
		mainContent.style.display = 'none';
	});

	profileCloseButton.addEventListener('click', () => {
		profileModal.hide();
	});

    window.addEventListener('popstate', (event) => {
        const section = event.state?.section || 'home';
		if (section == 'pongOptionsB' || section == 'pongOptionsP' || section == 'multi' || section == 'tournament')
			game.windowChange = true;
        showSection(section, false);
    });

    function showSection(section, addToHistory = true) {
        const sections = ['home', 'profile', 'pongOptionsB', 'pongOptionsP', 'multi', 'playing', 'tournament'];
        eraseGameWhilePlaying();
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
		const userDataString = sessionStorage.getItem(email);

		if (!userDataString) {
			return false;
		}

		const userData = JSON.parse(userDataString);
		return userData.password === password;
	}

	function registerUser(firstName, lastName, userName, email, password) {
		const userExists = sessionStorage.getItem(email);
		if (userExists) {
			return false;
		}
		sessionStorage.setItem(email, JSON.stringify({ firstName, lastName, userName, email, password }));
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
			register: "Register",
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
			p5: "Nickname for Player 5:",
			p6: "Nickname for Player 6:",
			p7: "Nickname for Player 7:",
			p8: "Nickname for Player 8:",
			addplayer: "+ Add Player",
			submit: "Submit",
			profile: "Profile",
			logout: "Logout",
			vsp: "vs Player",
			vsb: "vs Bot",
			tournament: "Tournament",
			fname: "First Name:",
			lname: "Last Name:",
			pusername: "Username:",
			pmail: "Email:",
			delacc: "Delete Account",
			anonymise: "Anonymise Data",
			uploadp: "Upload Profile Picture",
			upload: "Upload",
			back: "Back"
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
			p5: "Surnom pour le Joueur 5 :",
			p6: "Surnom pour le Joueur 6 :",
			p7: "Surnom pour le Joueur 7 :",
			p8: "Surnom pour le Joueur 8 :",
			addplayer: "+ Ajouter un joueur",
			submit: "Soumettre",
			profile: "Profil",
			logout: "Déconnexion",
			vsp: "vs Joueur",
			vsb: "vs Bot",
			tournament: "Tournoi",
			fname: "Prenom:",
			lname: "Nom:",
			pusername: "Nom d'utilisateur :",
			pmail: "E-mail :",
			delacc: "Supprimer le compte",
			anonymise: "Anonymiser les données",
			uploadp: "Télécharger la photo de profil",
			upload: "Télécharger",
			back: "Retour"
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
			p5: "Apodo para el Jugador 5:",
			p6: "Apodo para el Jugador 6:",
			p7: "Apodo para el Jugador 7:",
			p8: "Apodo para el Jugador 8:",
			addplayer: "+ Agregar jugador",
			submit: "Enviar",
			profile: "Perfil",
			logout: "Cerrar sesión",
			vsp: "vs Jugador",
			vsb: "vs Bot",
			tournament: "Torneo",
			fname: "Nombre:",
			lname: "Apellido:",
			pusername: "Nombre de usuario:",
			pmail: "Correo:",
			delacc: "Eliminar cuenta",
			anonymise: "Anonimizar datos",
			uploadp: "Subir foto de perfil",
			upload: "Subir",
			back: "Regreso"
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
    const backToHomeTButton = document.getElementById('backToHomeT');
    const backToHomePButton = document.getElementById('backToHomeP');
    const backToHomeBButton = document.getElementById('backToHomeB');
    const backToHomeMButton = document.getElementById('backToHomeM');

    
    backToHomeTButton.addEventListener('click', (e) => {
		e.preventDefault();
        showSection('home');
    });

    backToHomePButton.addEventListener('click', (e) => {
		e.preventDefault();
        showSection('home');
    });

    backToHomeBButton.addEventListener('click', (e) => {
		e.preventDefault();
        showSection('home');
    });

    backToHomeMButton.addEventListener('click', (e) => {
		e.preventDefault();
        showSection('home');
    });

	function getCookie(name) {
		let cookieValue = null;
		if (document.cookie && document.cookie !== '') {
			const cookies = document.cookie.split(';');
			for (let i = 0; i < cookies.length; i++) {
				const cookie = cookies[i].trim();
				if (cookie.substring(0, name.length + 1) === (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
	
	const csrftoken = getCookie('csrftoken');
	// console.log('CSRF Token:', csrftoken);
	sessionStorage.setItem('csrftoken', csrftoken);
	
	async function registerUserDB(userData2) {
		// console.log("Données envoyées: ", JSON.stringify(userData2));
		// const csrftoken = getCookie('csrftoken');
		try {
			const response = await fetch('/api/register/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-CSRFToken': csrftoken,
				},
				body: JSON.stringify(userData2),
			});
			if (!response.ok) {
				const errorData = await response.json();
				// console.log('Erreur:' + errorData);
				let errorMessage = 'Erreur lors de l\'inscription:\n';
				for (const [key, value] of Object.entries(errorData)) {
					errorMessage += `${key}: ${value.join(', ')}\n`;
				}
				alert(errorMessage);
				return false;
			}
			sessionStorage.setItem('username', userData2.username);
			sessionStorage.setItem('firstname', userData2.firstname);
			sessionStorage.setItem('lastname', userData2.lastname);
			sessionStorage.setItem('email', userData2.email);
			// console.log('CSRF Token:', csrftoken);
			return true;
		} catch (error) {
			return false;
		}
	}
	
	async function loginUserDB(userData3) {
		// const csrftoken = getCookie('csrftoken');
		try {
			const response = await fetch('/api/login/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-CSRFToken': csrftoken,
				},
				body: JSON.stringify(userData3),
			});
	
			if (response.ok) {
				const data = await response.json();
				return data;
			} else {
				return false;
			}
		} catch (error) {
			console.error('Erreur lors de la connexion:', error);
			return false;
		}
	}
	
	async function editUserDB(userData3) {
		// const csrftoken = getCookie('csrftoken');
		// console.log("test 1 du csrf token: " + getCookie('csrftoken'));
		// console.log("test 2 du csrf token: " + csrftoken);
		// console.log("test 3 du csrf token: " + sessionStorage.getItem('csrftoken'));
		try {
			const response = await fetch('/api/edit/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-CSRFToken': csrftoken,
				},
				body: JSON.stringify(userData3),
			});
	
			if (response.ok) {
				const data = await response.json();
				return data;
			} else {
				return false;
			}
		} catch (error) {
			console.error('Erreur lors de la connexion:', error);
			return false;
		}
	}
	
	async function deleteAccount(userData5) {
		// const csrftoken = getCookie('csrftoken');
		// console.log(getCookie("csrf", 'csrftoken'));
		try {
			const response = await fetch('/api/deleteaccount/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-CSRFToken': csrftoken,
				},
				body: JSON.stringify(userData5),
			});
	
			if (response.ok) {
				const data = await response.json();
				return data;
			} else {
				return false;
			}
		} catch (error) {
			console.error('Erreur lors de la connexion:', error);
			return false;
		}
	}
	
	async function anonymiseUser(userData6) {
		// console.log(getCookie("csrf", 'csrftoken'));
		try {
			const response = await fetch('/api/edit/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-CSRFToken': csrftoken,
				},
				body: JSON.stringify(userData6),
			});
	
			if (response.ok) {
				const data = await response.json();
				return data;
			} else {
				return false;
			}
		} catch (error) {
			console.error('Erreur lors de la connexion:', error);
			return false;
		}
	}
	
	// async function postUserDB(userData) {
	// 	// console.log(getCookie("csrf", 'csrftoken'));
	// 	try {
	// 		const response = await fetch('/api/postusername/', {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 			body: JSON.stringify(userData),
	// 		});
	
	// 		if (response.ok) {
	// 			const data = await response.json();
	// 			return data;
	// 		} else {
	// 			return false;
	// 		}
	// 	} catch (error) {
	// 		console.error('Erreur lors de la connexion:', error);
	// 		return false;
	// 	}
	// }
	
	async function getUserDB() {
		// console.log("el famoso token de connection: " + localStorage.getItem('authToken'));
		try {
			const response = await fetch('/api/getUserInfo/', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Token ' + localStorage.getItem('authToken')
				},
			});
	
			if (response.ok) {
				const data = await response.json();
				return data;
			} else {
				return false;
			}
		} catch (error) {
			console.error('Erreur lors de la connexion:', error);
			return false;
		}
	}

});