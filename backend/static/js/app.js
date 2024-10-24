document.addEventListener('DOMContentLoaded', () => {
	const app = document.getElementById('app');

	// Templates for login and register modals
	const loginModalTemplate = `
		<div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="loginModalLabel">Login</h5>
					</div>
					<div class="modal-body">
						<form id="loginForm">
							<div class="mb-3">
								<label for="email" class="form-label">Email Address</label>
								<input type="email" class="form-control" id="email" required>
							</div>
							<div class="mb-3">
								<label for="password" class="form-label">Password</label>
								<input type="password" class="form-control" id="password" required>
							</div>
							<button type="submit" class="btn btn-primary">Login</button>
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
						<h5 class="modal-title" id="registerModalLabel">Register</h5>
					</div>
					<div class="modal-body">
						<form id="registerForm">
							<div class="form-group">
								<label for="firstName">First Name</label>
								<input type="text" class="form-control" id="firstName" required>
							</div>
							<div class="form-group">
								<label for="lastName">Last Name</label>
								<input type="text" class="form-control" id="lastName" required>
							</div>
							<div class="form-group">
								<label for="userName">User Name</label>
								<input type="text" class="form-control" id="userName" required>
							</div>
							<div class="form-group">
								<label for="registerEmail">Email Address</label>
								<input type="email" class="form-control" id="registerEmail" required>
							</div>
							<div class="form-group">
								<label for="newPassword">Password</label>
								<input type="password" class="form-control" id="newPassword" required>
							</div>
							<div class="form-group">
								<label for="confirmPassword">Confirm Password</label>
								<input type="password" class="form-control" id="confirmPassword" required>
							</div>
							<button type="submit" class="btn btn-primary">Register</button>
							<button type="button" class="btn btn-secondary" id="register42Button">
								Register with
								<img src="logo 42" style="height: 20px; width: 20px;">
							</button>
						</form>
						<p class="mt-3">Already have an account? <a href="#" id="showLogin">Login</a></p>
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
						<h5 class="modal-title" id="profileModalLabel">Edit Profile</h5>
						<button type="button" class="btn-close" id="closeProfileModal" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form id="editProfileForm">
							<div class="form-group">
								<label for="editFirstName">First Name</label>
								<input type="text" class="form-control" id="editFirstName" required>
							</div>
							<div class="form-group">
								<label for="editLastName">Last Name</label>
								<input type="text" class="form-control" id="editLastName" required>
							</div>
							<div class="form-group">
								<label for="editUserName">User Name</label>
								<input type="text" class="form-control" id="editUserName" required>
							</div>
							<div class="form-group">
								<label for="editEmail">Email Address</label>
								<input type="email" class="form-control" id="editEmail" required>
							</div>
							<button type="submit" class="btn btn-primary">Save Changes</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	`;

	const gameOptionsModalTemplate = `
		<div class="modal fade" id="customModal" tabindex="-1" aria-labelledby="customModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 id="options" class="card-title text-center">Game Options</h5>
						<button type="button" class="btn-close" id="closeGameOptionsModal" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body>
                    	<form id="pongOptions" onsubmit="saveOptions(event)">
                    	    <div class="mb-3">
                    	        <label id="mode" for="gameMode" class="form-label">Choose your opponent:</label>
                    	        <select id="gameMode" class="form-select" onchange="togglePlayerName()">
                    	            <option id="bot" value="bot">Play against a bot</option>
                    	            <option id="player" value="player">Play against another player</option>
                    	        </select>
                    	    </div>
	
                    	    <div id="secondPlayer" class="d-none">
                    	        <label id="name" for="playerName" class="form-label">Nickname for the second player:</label>
                    	        <input type="text" id="playerName" class="form-control" placeholder="Enter nickname">
                    	    </div>
	
                    	    <div class="mb-3">
                    	        <label id="bar" for="barSize" class="form-label">Select a bar size:</label>
                    	        <select id="gameBackground" class="form-select">
                    	            <option id="small" value="small">Small</option>
                    	            <option id ="medium" value="medium">Medium</option>
                    	            <option id="big" value="big">Big</option>
                    	        </select>
                    	    </div>

                    	    <div class="mb-3">
                    	        <label id="points" for="gamePoints" class="form-label">Points to win:</label>
                    	        <select id="gamePoints" class="form-select">
                    	            <option value="1">1</option>
                    	            <option value="1">2</option>
                    	            <option value="3">3</option>
                    	            <option value="3">4</option>
                    	            <option value="5">5</option>
                    	            <option value="5">6</option>
                    	            <option value="7">7</option>
                    	            <option value="7">8</option>
                    	            <option value="9">9</option>
                    	        </select>
                    	    </div>
                    	    <div class="mb-3">
                    	        <label id="ball" for="ballSize" class="form-label">Select a ball size:</label>
                    	        <select id="ballSize" class="form-select">
                    	            <option id="small2" value="small">Small</option>
                    	            <option id="medium2" value="medium">Medium</option>
                    	            <option id="big2" value="big">Big</option>
                    	        </select>
                    	    </div>
                    	    <button id="submit" type="submit" class="btn btn-primary">Submit</button>
                    	</form>
					</div>
                </div>
            </div>
	`;

	const passwordModalTemplate = `
		<div class="modal fade" id="changePasswordModal" tabindex="-1" aria-labelledby="changePasswordModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="changePasswordModalLabel">Change Password</h5>
						<button type="button" class="btn-close" id ="closePasswordModal" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form id="changePasswordForm">
							<div class="mb-3">
								<label for="currentPassword" class="form-label">Current Password</label>
								<input type="password" class="form-control" id="currentPassword" required>
							</div>
							<div class="mb-3">
								<label for="newPassword" class="form-label">New Password</label>
								<input type="password" class="form-control" id="newPassword" required>
							</div>
							<div class="mb-3">
								<label for="confirmPassword" class="form-label">Confirm Password</label>
								<input type="password" class="form-control" id="confirmPassword" required>
							</div>
							<button type="submit" class="btn btn-primary">Change Password</button>
						</form>
					</div>
				</div>
			</div>
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
							<a class="nav-link" href="#" id="navHome">Home</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#" id="navProfile">Profile</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#" id="navHistory">History</a>
						</li>
						<li class="nav-item">
							<button class="btn btn-outline-danger my-2 my-sm-0" id="logoutButton">Logout</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<div id="mainContent">
			<div id="homeSection">
				<button class="btn btn-primary my-2 my-sm-0" id="gameButton">1v1</button>
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
						<p><strong>Name:</strong> <span id="profileName"></span></p>
						<p><strong>Username:</strong> <span id="profileUserName"></span></p>
						<p><strong>Email:</strong> <span id="profileEmail"></span></p>
					</div>
					<button class="btn btn-secondary mt-3 w-100" id="editProfileButton">Edit Profile</button>
					<button class="btn btn-secondary mt-3 w-100" id="changePasswordButton">Change Password</button>
					<button class="btn btn-danger mt-3 w-100" id="deleteAccountButton">Delete Account</button>
					<button class="btn btn-warning mt-3 w-100" id="anonymizeUserButton">Anonymize Data</button>
				</div>
				<form id="uploadProfilePictureForm" class="mt-3" w-100>
					<div class="form-group mb-3">
						<label for="profilePictureInput" class="form-label">Upload Profile Picture</label>
						<input type="file" class="form-control" id="profilePictureInput" accept="image/*">
					</div>
					<button type="submit" class="btn btn-primary">Upload</button>
				</form>
			</div>
		</div>
	`;


	app.innerHTML = loginModalTemplate + registerModalTemplate + profileModalTemplate + passwordModalTemplate + mainContentTemplate + gameOptionsModalTemplate;

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

    const customModal = new bootstrap.Modal(document.getElementById('customModal'), {
        backdrop: 'static',
        keyboard: false
    });

	const mainContent = document.getElementById('mainContent');
	const showRegister = document.getElementById('showRegister');
	const loginForm = document.getElementById('loginForm');
	const showLogin = document.getElementById('showLogin');
	const registerForm = document.getElementById('registerForm');
	const navHome = document.getElementById('navHome');
	const navHistory = document.getElementById('navHistory');
	const navProfile = document.getElementById('navProfile');
	const logoutButton = document.getElementById('logoutButton');
	const gameButton = document.getElementById('gameButton');
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
	const gameOptionsCloseButton = document.getElementById('closeGameOptionsModal');

	loginModal.show();

	showRegister.addEventListener('click', (e) => {
		e.preventDefault();
		loginModal.hide();
		registerModal.show();
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
		const password = document.getElementById('newPassword').value;
		const confirmPassword = document.getElementById('confirmPassword').value;

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

	gameButton.addEventListener('click', () => {
		mainContent.style.display = 'none';
		customModal.show();
		launchGame();
		mainContent.style.display = 'block';
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

	gameOptionsCloseButton.addEventListener('click', () => {
		customModal.hide();
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

        showSection(section, false);
    });

    function showSection(section, addToHistory = true) {
        const sections = ['home', 'history', 'profile'];
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

    const backToHomeButton = document.getElementById('backToHome');

    
    backToHomeButton.addEventListener('click', () => {
        showSection('home');
    });

	
});