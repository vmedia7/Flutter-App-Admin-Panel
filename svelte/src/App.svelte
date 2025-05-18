<!-- App.svelte -->
<script>
	import { onMount } from 'svelte';
	import ButtonEditor from './components/ButtonEditor.svelte'
	import SectionEditor from './components/SectionEditor.svelte';
	import Preview from './components/Preview.svelte';
	import Loader from './components/Loader.svelte';
	import Dialog from './components/Dialog.svelte';
  
	// Initial data structure
	let dashboardData = {
	  sections: [
		{
		  id: "section1",
		  title: "Browse Rapture Ready",
		  buttons: [
			{ id: "btn1-1", icon: "👥", text: "Rapture Ready", color: "#0066ff", link: "#" },
			{ id: "btn1-2", icon: "📈", text: "Rapture Index", color: "#0066ff", link: "#" },
			{ id: "btn1-3", icon: "📰", text: "Rapture Ready News", color: "#0066ff", link: "#" },
			{ id: "btn1-4", icon: "🎬", text: "Rapture Ready TV", color: "#0066ff", link: "#" },
			{ id: "btn1-5", icon: "📖", text: "Read Bible", color: "#0066ff", link: "#" },
			{ id: "btn1-6", icon: "🕛", text: "Nearing Midnight", color: "#0066ff", link: "#" },
			{ id: "btn1-7", icon: "🕒", text: "Israel Watch", color: "#0066ff", link: "#" },
			{ id: "btn1-8", icon: "🙏", text: "Prayer Center", color: "#0066ff", link: "#" },
			{ id: "btn1-9", icon: "👤", text: "RR Forms", color: "#0066ff", link: "#" },
			{ id: "btn1-10", icon: "↓", text: "VertiZontal Media", color: "#0066ff", link: "#" },
			{ id: "btn1-11", icon: "✍️", text: "End Time Writers", color: "#0066ff", link: "#" },
			{ id: "btn1-12", icon: "📝", text: "Christian Classics", color: "#0066ff", link: "#" }
		  ]
		},
		{
		  id: "section2",
		  title: "Eternity Ready Media",
		  buttons: [
			{ id: "btn2-1", icon: "💻", text: "Watch TV", color: "#0066ff", link: "#" },
			{ id: "btn2-2", icon: "🎙️", text: "Podcasts", color: "#0066ff", link: "#" },
			{ id: "btn2-3", icon: "📻", text: "Radio", color: "#0066ff", link: "#" },
			{ id: "btn2-4", icon: "▶️", text: "On Demand", color: "#0066ff", link: "#" },
			{ id: "btn2-5", icon: "📺", text: "TV Channels", color: "#0066ff", link: "#" },
			{ id: "btn2-6", icon: "🎵", text: "Music Videos", color: "#0066ff", link: "#" }
		  ]
		},
		{
		  id: "section3",
		  title: "Connect with US",
		  buttons: [
			{ id: "btn3-1", icon: "💬", text: "Contact", color: "#0066ff", link: "#" },
			{ id: "btn3-2", icon: "💲", text: "Donate", color: "#0066ff", link: "#" },
			{ id: "btn3-3", icon: "📞", text: "Call US", color: "#0066ff", link: "#" }
		  ]
		}
	  ],
	  bottomNav: [
		{ id: "nav-1", icon: "🏠", text: "Home", color: "#0066ff", link: "#", active: true },
		{ id: "nav-2", icon: "👥", text: "Rapture R", color: "#888", link: "#", active: false },
		{ id: "nav-3", icon: "📺", text: "TV", color: "#888", link: "#", active: false },
		{ id: "nav-4", icon: "📻", text: "Radio", color: "#888", link: "#", active: false }
	  ],
	  more: [
		{ id: "more-1", icon: "📺", text: "Home", link: "#" },
		{ id: "more-2", icon: "💲", text: "Rapture R", link: "#" },
	  ]
	};

	function generateSectionId() {
		return 's' + Math.random().toString(36).slice(2, 6); // 4 random chars
	}

	// Should show more dialog
	let showMoreDialog = false;
  
	// Current section being edited
	let currentSectionId = 'section1';

	// Is page loading
	let isLoading = true;
	
	// Handle section change
	function handleSectionChange(event) {
	  currentSectionId = event.target.value;
	}
	
	// Add a new button to the current section
	function addButton() {
	  if (currentSectionId === 'bottom-nav') {
		if (dashboardData.bottomNav.length < 5) {
		  const newId = `nav-${Date.now()}`;
		  dashboardData.bottomNav = [...dashboardData.bottomNav, {
			id: newId,
			icon: "⭐",
			text: "New Item",
			color: "#888",
			link: "#",
			active: false
		  }];
		} else {
		  alert("Maximum 5 navigation items allowed!");
		}
	  } else {
		const sectionIndex = dashboardData.sections.findIndex(s => s.id === currentSectionId);
		if (sectionIndex !== -1) {
		  const buttonCount = dashboardData.sections[sectionIndex].buttons.length;
		  if (buttonCount % 3 === 0 && buttonCount >= 12) {
			alert("Maximum of 12 buttons reached for this section!");
			return;
		  }
		  
		  const newId = `${currentSectionId}-btn-${Date.now()}`;
		  dashboardData.sections[sectionIndex].buttons = [
			...dashboardData.sections[sectionIndex].buttons,
			{
			  id: newId,
			  icon: "⭐",
			  text: "New Button",
			  color: "#0066ff",
			  link: "#"
			}
		  ];
		}
	  }
	  
	  // Force svelte to update
	  dashboardData = {...dashboardData};
	}
	
	// Update section title
	function updateSectionTitle(title) {
	  const sectionIndex = dashboardData.sections.findIndex(s => s.id === currentSectionId);
	  if (sectionIndex !== -1) {
		dashboardData.sections[sectionIndex].title = title;
		// Force svelte to update
		dashboardData = {...dashboardData};
	  }
	}
	
	// Update button
	function updateButton(buttonData) {
	  if (buttonData.isNavItem) {
		const index = dashboardData.bottomNav.findIndex(item => item.id === buttonData.id);
		if (index !== -1) {
		  // If setting active, deactivate all others
		  if (buttonData.active) {
			dashboardData.bottomNav = dashboardData.bottomNav.map(item => ({
			  ...item,
			  active: false
			}));
		  }
		  
		  dashboardData.bottomNav[index] = {
			...dashboardData.bottomNav[index],
			...buttonData
		  };
		  
		  // Force svelte to update
		  dashboardData = {...dashboardData};
		}
	  } else {
		const sectionIndex = dashboardData.sections.findIndex(s => s.id === currentSectionId);
		if (sectionIndex !== -1) {
		  const buttonIndex = dashboardData.sections[sectionIndex].buttons.findIndex(b => b.id === buttonData.id);
		  if (buttonIndex !== -1) {
			dashboardData.sections[sectionIndex].buttons[buttonIndex] = {
			  ...dashboardData.sections[sectionIndex].buttons[buttonIndex],
			  ...buttonData
			};
			
			// Force svelte to update
			dashboardData = {...dashboardData};
		  }
		}
	  }
	}

	// Update more button
	function updateMoreButton(buttonData) {
		const btnIndex = dashboardData.more.findIndex(item => item.id === buttonData.id);
		if (btnIndex !== -1) {
			dashboardData.more[btnIndex] = buttonData;
			dashboardData = {...dashboardData};
		}
	}
	
	// Delete button
	function deleteButton(buttonData) {
	  if (buttonData.isNavItem) {
		if (dashboardData.bottomNav.length <= 1) {
		  alert("Cannot delete the last navigation item!");
		  return;
		}
		
		dashboardData.bottomNav = dashboardData.bottomNav.filter(item => item.id !== buttonData.id);
	  } else {
		const sectionIndex = dashboardData.sections.findIndex(s => s.id === currentSectionId);
		if (sectionIndex !== -1) {
		  dashboardData.sections[sectionIndex].buttons = dashboardData.sections[sectionIndex].buttons.filter(b => b.id !== buttonData.id);
		}
	  }
	  
	  // Force svelte to update
	  dashboardData = {...dashboardData};
	}

	// Delete more button
	function deleteMoreButton(buttonData) {
		const btnIndex = dashboardData.more.findIndex(item => item.id === buttonData.id)
		if (btnIndex !== -1) {
			dashboardData.more.splice(btnIndex, 1);
			dashboardData = {...dashboardData};
		}
	}

	// create more button
	function createMoreButton(btnData) {
		dashboardData.more.push(btnData);
		dashboardData = {...dashboardData};
	}

	// delete current section
	function deleteSection() {
		const sectionIndex = dashboardData.sections.findIndex(s => s.id === currentSectionId);
		if (sectionIndex !== -1) {
			dashboardData.sections.splice(sectionIndex, 1);
			dashboardData = {...dashboardData};
		}
	}

	// Add new section
	function addSection() {
		const newSectionData = {
		  id: generateSectionId(),
		  title: "New Section",
		  buttons: []
		}

		dashboardData.sections.push(newSectionData);
		currentSectionId = newSectionData.id;
		dashboardData = {...dashboardData};
	}

	function downloadData() {
		const dataStr = JSON.stringify(dashboardData, null, 2);
		const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
			
		const exportFileDefaultName = 'dashboard-data.json';
			
		const linkElement = document.createElement('a');
		linkElement.setAttribute('href', dataUri);
		linkElement.setAttribute('download', exportFileDefaultName);
		linkElement.click();
	}
	
	// Export data as JSON
	async function exportData() {
		try {
			let response = await fetch(/*'http://localhost:8000/update'*/'/update', {
				method: 'POST',
				body: JSON.stringify({data: dashboardData}),
				headers: { 'Content-Type': 'application/json', "fetch-data": "true" }
			});
			let result = await response.json();
			if(result.status) {
				downloadData();
			}
		} catch (error) {
			console.log(error);
		}
	}

	async function loadContent() {
		try {
			let response = await fetch(/*'http://localhost:8000/data'*/'/data', {
				method: 'GET',
				headers: { 'Content-Type': 'application/json', "fetch-data": "true" }
			});
			let result = await response.json();
			dashboardData = result.data;
		} catch (error) {
			console.log(error);
		} finally {
			isLoading = false;
		}
	}

	onMount(() => { loadContent() });
</script>
  
<style>
	:global(:root) {
		--primary-color: #0066ff;
		--dark-bg: #2d3e4a;
		--light-bg: #f5f5f5;
		--text-color: #333;
		--border-color: #ddd;
	}
	
	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		font-family: Arial, sans-serif;
		scrollbar-color: #222 #000;
    	scrollbar-width: thin;
	}
	
	:global(body) {
		background-color: var(--light-bg);
		color: var(--text-color);
	}

	.loading-container {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--dark-bg);
	}
	
	.container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	
	header {
		background-color: var(--dark-bg);
		color: white;
		padding: 1rem;
	}
	
	.dashboard {
		display: flex;
		flex: 1;
		flex-direction: row;
	}
	
	.editor-panel {
		flex: 1;
		padding: 1rem;
		border-right: 1px solid var(--border-color);
		overflow-y: auto;
		background-color: white;
	}
	
	.section {
	  	margin-bottom: 2rem;
	}
	
	h2 {
		margin-bottom: 1rem;
		color: var(--dark-bg);
	}
	
	.form-group {
	  	margin-bottom: 1rem;
	}
	
	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: bold;
	}
	
	select {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid var(--border-color);
		border-radius: 4px;
	}
	
	button {
		background-color: var(--primary-color);
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
		margin-right: 0.5rem;
		margin-top: 0.5rem;
	}
	
	button:hover {
	  	opacity: 0.9;
	}
	
	.export-btn {
	  	margin-top: 1rem;
	}

	@media (max-width: 768px) {
	  .dashboard {
		flex-direction: column;
	  }
	}
</style>

{#if isLoading == true}
	<div class="loading-container">
		<Loader />
	</div>
{:else}
	<div class="container">
		<header>
			<h1>Rapture Ready Dashboard Editor</h1>
		</header>
		
		<div class="dashboard">
			<div class="editor-panel">
				<div class="section">
				<h2>Section Management</h2>
				<div class="form-group">
					<label for="section-select">Select Section to Edit:</label>
					<select id="section-select" on:change={handleSectionChange} bind:value={currentSectionId}>
					{#each dashboardData.sections as section}
						<option value={section.id}>{section.title}</option>
					{/each}
					<option value="bottom-nav">Bottom Navigation</option>
					</select>
				</div>
				
				<SectionEditor currentSectionId={currentSectionId} sections={dashboardData.sections} on:updateTitle={e => updateSectionTitle(e.detail)} />

				<div style="display: flex; align-items: center; justify-content: space-between;">
					<div>
						<button style="background-color: darkgreen; color: white;" on:click={addSection}>Add New Section</button>
						<button style="background-color: orangered; color: white;" class="export-btn" on:click={deleteSection}>Delete Section &times;</button>
					</div>

					<div>
						<button on:click={addButton}>Add New Button</button>
						<button class="export-btn" on:click={exportData}>Export Data</button>
					</div>
				</div>	
			</div>
				
			<div class="section">
					<h2>Buttons Editor</h2>
				
					{#if currentSectionId === 'bottom-nav'}
						{#each dashboardData.bottomNav as button}
							<ButtonEditor buttonData={{...button, isNavItem: true}} on:update={e => updateButton(e.detail)} on:delete={e => deleteButton(e.detail)} />
						{/each}
					{:else}
						{#each dashboardData.sections.find(s => s.id === currentSectionId)?.buttons || [] as button}
							<ButtonEditor buttonData={{...button, isNavItem: false}} on:update={e => updateButton(e.detail)} on:delete={e => deleteButton(e.detail)} />
						{/each}
					{/if}
				</div>
			</div>
			
			<Preview {dashboardData} onShowMore={() => { showMoreDialog = true }}/>
		</div>
	</div>
{/if}

{#if showMoreDialog}
	<Dialog data={dashboardData.more} 
		on:close={() => {showMoreDialog = false}} on:update={e => updateMoreButton(e.detail)} 
		on:delete={e => deleteMoreButton(e.detail)} on:create={e => createMoreButton(e.detail)} />
{/if}