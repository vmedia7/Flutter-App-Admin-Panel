<!-- SectionEditor.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';

    export let currentSectionId;
    export let sections;

    const dispatch = createEventDispatcher();

    let sectionTitle = '';
    let currentSection;
    let previousSectionId;

    $: {
        currentSection = sections.find(s => s.id === currentSectionId);
        if (currentSectionId !== previousSectionId) {
            sectionTitle = currentSection?.title || '';
            previousSectionId = currentSectionId;
        }
    }

    function handleTitleChange() {
        dispatch('updateTitle', sectionTitle);
    }
</script>
  
<style>
    .form-group {
      margin-bottom: 1rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }
    
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid var(--border-color);
      border-radius: 4px;
    }
</style>
  
{#if currentSectionId !== 'bottom-nav' && currentSection}
    <div class="form-group">
      <label for="section-title">Section Title:</label>
      <input type="text" id="section-title" bind:value={sectionTitle} on:input={handleTitleChange} placeholder="Enter section title" />
    </div>
{/if}